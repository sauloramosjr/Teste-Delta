import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlunosService } from './alunos.service';
import { AlunosController } from './alunos.controller';
import { AlunosEntity } from 'src/alunos/entities/aluno.entity';
import { AlunoRepository } from 'src/alunos/repository/aluno.repository';

const forFeature = TypeOrmModule.forFeature([AlunosEntity, AlunoRepository]);
@Module({
  imports: [forFeature],
  controllers: [AlunosController],
  providers: [AlunosService, AlunoRepository],
})
export class AlunosModule {}
