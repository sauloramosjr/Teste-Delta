import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { AlunoRepository } from 'src/alunos/repository/aluno.repository';
import { IAlunoRepository } from 'src/alunos/repository/alunoRepository.interface';
import { fileWizard } from 'src/utils/fileWizard';
import { IAluno } from 'src/alunos/interfaces/aluno.interface';
import { DeleteResult, UpdateResult } from 'typeorm';

/**
  Serviço responsável por fornecer uma camada de abstração para as operações de alunos,
  como criar, ler, atualizar e excluir alunos.
  @export
  @class AlunosService
*/
@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  /**
    Cria um novo aluno
    @param {CreateAlunoDto} createAlunoDto
    @param {Express.Multer.File} file
    @returns {Promise<IAluno>}
  */
  async create(
    createAlunoDto: CreateAlunoDto,
    file: Express.Multer.File,
  ): Promise<IAluno> {
    await this.alunoRepository.conferirSeJaExisteAlunoComEsteNome(
      createAlunoDto.nome,
    );
    return await this.alunoRepository.createAluno(
      createAlunoDto,
      file.filename,
    );
  }

  /**
    Recupera todos os alunos
    @returns {Promise<IAluno[]>}
  */
  async findAll(): Promise<IAluno[]> {
    return await this.alunoRepository.findAllAlunos();
  }

  /**
    Recupera um aluno pelo ID
    @param {number} id
    @returns {Promise<IAluno>}
  */
  async findOne(id: number): Promise<IAluno> {
    return this.alunoRepository.findAlunoById(id);
  }

  /**
    Atualiza um aluno pelo ID
    @param {number} id
    @param {UpdateAlunoDto} updateAlunoDto
    @param {Express.Multer.File} file
    @returns {Promise<UpdateResult>}
  */
  async update(
    id: number,
    updateAlunoDto: UpdateAlunoDto,
    file: Express.Multer.File,
  ): Promise<UpdateResult> {
    await this.alunoRepository.findAlunoById(id);
    let aluno = updateAlunoDto;
    if (!!file) {
      fileWizard.deletarArquivo(updateAlunoDto.oldImage);
      aluno = { ...updateAlunoDto, foto: file.filename };
    }
    delete aluno.oldImage;
    return this.alunoRepository.updateAlunoById(id, aluno);
  }

  /**
    Exclui um aluno pelo ID
    @param {number} id
    @returns {Promise<DeleteResult>}
  */
  async remove(id: number): Promise<DeleteResult> {
    const aluno = await this.findOne(id);
    fileWizard.deletarArquivo(aluno.foto);
    return this.alunoRepository.deleteAlunoById(id);
  }
}
