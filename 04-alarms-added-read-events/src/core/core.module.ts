import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationBootstrapOptions } from 'src/common/application-bootstrap-options.interface';

@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions) {
    const imports =
      options.driver === 'orm'
        ? [
            TypeOrmModule.forRoot({
              type: 'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: 'pass123',
              autoLoadEntities: true,
              synchronize: true,
            }),
            MongooseModule.forRoot('mongodb://localhost:27017/vf-read-db'),
          ]
        : [];
    return {
      module: CoreModule,
      imports,
    };
  }
}
