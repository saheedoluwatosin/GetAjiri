import { Field, ObjectType } from "@nestjs/graphql";
import { UserStatus } from "libs/common/src/tools/enums/user-status.enum";





@ObjectType()
// @Directive('@key(fields: "phone")')
export class StartResponse {
  @Field(() => String, { description: 'Phone number received from user' })
  phone: string;

  @Field(() => UserStatus, {
    description: 'Registration status of the user',
  })
  status: UserStatus;
}