
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule],
})
export class DatabaseModule {
  static forRootAsync(): DynamicModule {
    return MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.getOrThrow('MONGODB_URI'),
        //   dbName: configService.getOrThrow('MONGO_DB_NAME'),
        };
      },
    });
  }

  static forFeature(models: ModelDefinition[]): DynamicModule {
    return MongooseModule.forFeature(models);
  }
}