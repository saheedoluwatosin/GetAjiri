import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "../database/abstract.schema";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { UserStatus } from "../tools/enums/user-status.enum";



@InputType()
@ObjectType()
@Schema({ timestamps: true, versionKey: false })
export class User extends AbstractDocument {
    @Prop({ required: true, unique: true })
    @Field(() => String, { description: 'The phone number of the user' })
    phoneNumber: string;

    @Prop({ type: String })
    @Field(() => String, { description: 'The OTP for the user' })
    otp: string;

    @Prop({ type: Date })
    @Field(() => Date, { description: 'The expiration date of the OTP for the user' })
    otpExpiresAt?: Date;

    @Prop({ type: String, required: true })
    @Field(() => String!, { description: 'The password of the user' })
    password: string;

    @Prop({ type: String, enum: UserStatus, default: UserStatus.INACTIVE })
    @Field(() => UserStatus, { description: 'The status of the user' })
    status: UserStatus;

    @Prop({ type: String })
    @Field(() => String!, { description: 'The first name of the user' })
    firstName?: string;

    @Prop({ type: String })
    @Field(() => String!, { description: 'The last name of the user' })
    lastName?: string;

    @Prop({ type: String })
    @Field(() => String!, { description: 'The email of the user' })
    email?: string;

    @Prop({ type: String , default: 'User' })
    @Field(() => String!, { description: 'The occupation of the user' })
    occupation?: string;

    @Prop({ type: Number })
    @Field(() => Int!, { description: 'The profile picture of the user' })
    nin?: number;

    @Prop({ type: String })
    @Field(() => String!, { description: 'The address of the user' })
    address?: string;

}


export const UserSchema = SchemaFactory.createForClass(User);
