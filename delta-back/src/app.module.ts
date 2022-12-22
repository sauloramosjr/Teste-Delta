import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunosModule } from './alunos/alunos.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // config caso use nest dentro do container
      // username: 'postgres', // | consfiguração caso suba apenas o container do postgres
      // password: 'postgres', // |
      // database: 'db', // |
      // port: 5436, // |
      autoLoadEntities: true,
      synchronize: true,
      migrationsRun: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    AlunosModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
