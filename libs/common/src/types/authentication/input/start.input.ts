import { Field, InputType } from "@nestjs/graphql";




@InputType()
export class StartInput {
  @Field(() => String, { description: 'Phone number of the user' })
  phoneNumber: string;
}