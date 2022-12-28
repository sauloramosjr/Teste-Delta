import { CreateAlunoDto } from 'src/alunos/dto/create-aluno.dto';
import { UpdateAlunoDto } from 'src/alunos/dto/update-aluno.dto';
import { IAluno } from 'src/alunos/interfaces/aluno.interface';
import { DeleteResult } from 'typeorm';

export interface IAlunoRepository {
  createAluno: (
    createAlunoDto: CreateAlunoDto,
    nomeFoto: string,
  ) => Promise<IAluno>;
  findAlunoById: (idAluno: number) => Promise<IAluno>;
  findAlunoByNome: (nomeAluno: string) => Promise<IAluno>;
  findAllAlunos: () => Promise<IAluno[]>;
  deleteAlunoById: (idAluno: number) => Promise<DeleteResult>;
  updateAlunoById: (id: number, aluno: UpdateAlunoDto) => Promise<DeleteResult>;
  conferirSeJaExisteAlunoComEsteNome: (nomeAluno: string) => Promise<void>;
}
