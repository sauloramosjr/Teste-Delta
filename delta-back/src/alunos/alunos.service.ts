import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

import { unlinkSync, existsSync } from 'fs';
import { AlunosEntity } from 'src/alunos/entities/aluno.entity';
import { throwException } from 'src/utils/httpExceptions';
import { Repository } from 'typeorm';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunosEntity)
    private alunosRepository: Repository<AlunosEntity>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto, file: Express.Multer.File) {
    if (
      await this.alunosRepository.findOne({
        where: { nome: createAlunoDto.nome },
      })
    ) {
      throwException('Já existe aluno com este nome!', HttpStatus.CONFLICT);
    }
    try {
      const aluno = { ...createAlunoDto, foto: file.filename };
      return await this.alunosRepository.save(aluno);
    } catch (error) {
      throwException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async findAll() {
    return await this.alunosRepository.createQueryBuilder('alunos').getMany();
  }

  async findOne(id: number) {
    const aluno = await this.alunosRepository.findOne({ where: { id } });
    if (!aluno) {
      throwException('Aluno não encontrado!', HttpStatus.NOT_FOUND);
    }
    return aluno;
  }

  async update(
    id: number,
    updateAlunoDto: UpdateAlunoDto,
    file: Express.Multer.File,
  ) {
    await this.findOne(id);
    let aluno = updateAlunoDto;
    if (!!file) {
      const foto = existsSync('./uploads/' + updateAlunoDto.oldImage);
      if (foto) unlinkSync('./uploads/' + updateAlunoDto.oldImage);
      aluno = { ...updateAlunoDto, foto: file.filename };
      delete aluno.oldImage;
    }
    try {
      return await this.alunosRepository.update(id, aluno);
    } catch (error) {
      throwException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async remove(id: number) {
    const aluno = await this.findOne(id);
    const foto = existsSync('./uploads/' + aluno.foto);
    if (foto) unlinkSync('./uploads/' + aluno.foto);
    try {
      const deletado = await this.alunosRepository.delete(aluno.id);
      return deletado;
    } catch (error) {
      throwException(error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
