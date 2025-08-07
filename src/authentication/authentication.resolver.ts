import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { StartResponse } from 'libs/common/src/types/authentication/response/start.response';
import { StartInput } from 'libs/common/src/types/authentication/input/start.input';
import { ActivateInput } from 'libs/common/src/types/authentication/input/activate.input';


@Resolver()
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => StartResponse)
  async startAuthentication(@Args('input') input: StartInput): Promise<StartResponse> {
    return this.authenticationService.start(input);
  }

  @Mutation()
  async activateUser(@Args('input') input: ActivateInput) {
    return this.authenticationService.activate(input);
  }

//   @Mutation()
//   async login(@Args('input') input: LoginInput) {
//     return this.authenticationService.login(input);
//   }
}