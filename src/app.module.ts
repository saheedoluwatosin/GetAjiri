import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationRepository } from './authentication/authentication.repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AuthenticationService, AuthenticationRepository],
})
export class AppModule {}
