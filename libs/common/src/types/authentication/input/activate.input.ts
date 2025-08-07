import { Field } from "@nestjs/graphql";




export class ActivateInput {
    @Field(() => String, { description: 'Phone number of the user' })
    phoneNumber: string;

    @Field(() => String, { description: 'One Time Password (OTP) sent to the user' })
    otp: string;

    @Field(() => String, { description: 'Password for the user' })
    password: string;

    @Field(() => String, { description: 'First name of the user' })
    firstName: string;

    @Field(() => String, { description: 'Last name of the user' })
    lastName: string;

    @Field(() => String, { description: 'Email address of the user' })
    email: string;

    @Field(() => String, { description: 'Occupation of the user' })
    occupation: string;

    @Field(() => String, { description: 'National Identification Number (NIN) of the user' })
    nin: string;

    @Field(() => String, { description: 'Address of the user' })
    address: string;
}