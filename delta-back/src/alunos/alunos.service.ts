import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { AlunoRepository } from 'src/alunos/repository/aluno.repository';
import { IAlunoRepository } from 'src/alunos/repository/alunoRepository.interface';
import { fileWizard } from 'src/utils/fileWizard';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(AlunoRepository)
    private readonly alunoRepository: IAlunoRepository,
  ) {}

  async create(createAlunoDto: CreateAlunoDto, file: Express.Multer.File) {
    await this.alunoRepository.conferirSeJaExisteAlunoComEsteNome(
      createAlunoDto.nome,
    );
    return await this.alunoRepository.createAluno(
      createAlunoDto,
      file.filename,
    );
  }

  async findAll() {
    return await this.alunoRepository.findAllAlunos();
  }

  async findOne(id: number) {
    return this.alunoRepository.findAlunoById(id);
  }

  async update(
    id: number,
    updateAlunoDto: UpdateAlunoDto,
    file: Express.Multer.File,
  ) {
    await this.alunoRepository.findAlunoById(id);
    let aluno = updateAlunoDto;
    if (!!file) {
      fileWizard.deletarArquivo(updateAlunoDto.oldImage);
      aluno = { ...updateAlunoDto, foto: file.filename };
    }
    delete aluno.oldImage;
    this.alunoRepository.updateAlunoById(id, aluno);
  }

  async remove(id: number) {
    const aluno = await this.findOne(id);
    fileWizard.deletarArquivo(aluno.foto);
    return this.alunoRepository.deleteAlunoById(id);
  }
}
