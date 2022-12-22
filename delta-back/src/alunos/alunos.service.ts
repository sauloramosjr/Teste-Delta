import { Injectable, StreamableFile } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AlunosEntity } from 'src/alunos/entities/aluno.entity';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunosEntity)
    private alunosRepository: Repository<AlunosEntity>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    if (
      await this.alunosRepository.findOne({
        where: { nome: createAlunoDto.nome },
      })
    ) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Já existe aluno com este nome!',
        },
        HttpStatus.CONFLICT,
      );
    }
    try {
      return await this.alunosRepository.save(createAlunoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async findAll() {
    return await this.alunosRepository.createQueryBuilder('alunos').getMany();
  }

  async findOne(id: number) {
    return await this.alunosRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    if (!(await this.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aluno não encontrado!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      return await this.alunosRepository.update(id, updateAlunoDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async remove(id: number) {
    if (!(await this.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aluno não encontrado!',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      return await this.alunosRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
