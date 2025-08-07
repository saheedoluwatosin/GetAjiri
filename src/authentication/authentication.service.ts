import { Injectable } from '@nestjs/common';
import { AuthenticationRepository } from './authentication.repository';
import { UserStatus } from 'libs/common/src/tools/enums/user-status.enum';
// import { TwilioService } from './twilio.service'; // Assuming you have a Twilio service
import { hash, compare } from 'bcrypt';
import { KnownError } from 'libs/common/src/tools/errors/known-error';
import { ErrorCode } from 'libs/common/src/tools/errors/error-codes';
import { ActivateInput } from 'libs/common/src/types/authentication/input/activate.input';
import { StartInput } from 'libs/common/src/types/authentication/input/start.input';
import { StartResponse } from 'libs/common/src/types/authentication/response/start.response';
import { UpdateQuery } from 'mongoose';
import { User } from 'libs/common/src/schema/user.schema';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly authRepository: AuthenticationRepository,
        // private readonly twilioService: TwilioService // Inject Twilio service
    ) {}

    async start(input: StartInput): Promise<StartResponse> {
        try {
            const { phoneNumber } = input;
            
            // Check if user exists
            const existingUser = await this.authRepository.findByPhoneNumber(phoneNumber);
            
            if (existingUser && existingUser.status === UserStatus.ACTIVE) {
                throw new KnownError(
                    ErrorCode.DUPLICATE,
                    'User is already registered and active'
                );
            }

            // Generate OTP based on environment
            const isDevelopment = process.env.NODE_ENV === 'development';
            const otp = isDevelopment ? '1234' : Math.floor(1000 + Math.random() * 9000).toString();
            
            // Set OTP expiration (e.g., 5 minutes from now)
            const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

            // Create or update user
            const userData = {
                phoneNumber,
                otp,
                otpExpiresAt,
                status: UserStatus.INACTIVE,
                ...(existingUser && { _id: existingUser.id })
            };

            await this.authRepository.ifNotFoundCreate(userData);

            // TODO: Send OTP via SMS using Twilio or any other service
            // if (!isDevelopment) {
            //     await this.twilioService.sendSMS(
            //         phoneNumber,
            //         `Your verification code is ${otp}`
            //     );
            // }

            return {
                success: true,
                message: 'Authentication started successfully',
            };
        } catch (error) {
            if (error instanceof KnownError) {
                throw error;
            }
            throw new KnownError(
                ErrorCode.INTERNAL_ERROR,
                'Failed to start authentication'
            );
        }
    }

    async activate(input: ActivateInput) {
        try {
            const { phoneNumber, otp, password, firstName, lastName, email, occupation, nin, address } = input;

            const user = await this.authRepository.findByPhoneNumber(phoneNumber);
            KnownError.ifNotFound(user, 'User not found');

            // Verify OTP
            if (user?.otp !== otp || !user?.otpExpiresAt || user.otpExpiresAt < new Date()) {
                throw new KnownError(ErrorCode.INVALID_CREDENTIALS, 'Invalid or expired OTP');
            }

            // Hash password
            const hashedPassword = await hash(password, 10);

            // Update user with provided details
            const update: UpdateQuery<User> = {
                $set: {
                password: hashedPassword,
                firstName,
                lastName,
                email,
                occupation,
                nin,
                address,
                status: UserStatus.ACTIVE,
                otp: null,
                otpExpiresAt: null,
                },
            };

            const updatedUser = await this.authRepository.userModel.findOneAndUpdate(
                { phoneNumber },
                update,
                { new: true },
            );

            KnownError.ifNotFound(updatedUser, 'Failed to update user');

            return {
                success: true,
                message: 'User activated successfully',
            };
        } catch (error) {
            if (error instanceof KnownError) {
                throw error;
            }
            throw new KnownError(
                ErrorCode.INTERNAL_ERROR,
                'Failed to activate user'
            );
        }
    }

    // =
}