import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAlunoDto } from 'src/alunos/dto/create-aluno.dto';
import { UpdateAlunoDto } from 'src/alunos/dto/update-aluno.dto';
import { IAluno } from 'src/alunos/interfaces/aluno.interface';
import { IAlunoRepository } from 'src/alunos/repository/alunoRepository.interface';
import { throwException } from 'src/utils/httpExceptions';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { AlunosEntity } from '../entities/aluno.entity';

export class AlunoRepository
  extends Repository<AlunosEntity>
  implements IAlunoRepository
{
  constructor(@Inject(DataSource) private dataSource: DataSource) {
    super(AlunosEntity, dataSource.createEntityManager());
  }
  async createAluno(
    createAlunoDto: CreateAlunoDto,
    nomeFoto: string,
  ): Promise<IAluno> {
    try {
      const aluno = { ...createAlunoDto, foto: nomeFoto };
      return await this.save(aluno);
    } catch (error) {
      throwException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async findAlunoById(idAluno: number): Promise<IAluno> {
    const aluno = await this.findOne({ where: { id: idAluno } });
    if (!aluno) {
      throwException('Aluno não encontrado!', HttpStatus.NOT_FOUND);
    }
    return aluno;
  }
  async conferirSeJaExisteAlunoComEsteNome(nomeAluno: string): Promise<void> {
    const aluno = await this.findOne({ where: { nome: nomeAluno } });
    if (aluno) {
      throwException('Já existe Aluno com este nome', HttpStatus.CONFLICT);
    }
  }

  async findAlunoByNome(nomeAluno: string): Promise<IAluno> {
    const aluno = await this.findOne({ where: { nome: nomeAluno } });
    if (!aluno) {
      throwException('Aluno não encontrado!', HttpStatus.NOT_FOUND);
    }
    return aluno;
  }

  async findAllAlunos(): Promise<IAluno[]> {
    return await this.createQueryBuilder('alunos').getMany();
  }

  async deleteAlunoById(idAluno: number): Promise<DeleteResult> {
    try {
      const deletado = await this.delete(idAluno);
      return deletado;
    } catch (error) {
      throwException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async updateAlunoById(
    id: number,
    aluno: UpdateAlunoDto,
  ): Promise<DeleteResult> {
    try {
      return await this.update(id, aluno);
    } catch (error) {
      throwException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
