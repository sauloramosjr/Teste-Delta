import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { AlunosEntity } from 'src/alunos/entities/aluno.entity';

const forFeature = TypeOrmModule.forFeature([AlunosEntity]);
@Module({
  imports: [forFeature],
  controllers: [AlunosController],
  providers: [AlunosService],
})
export class AlunosModule {}
