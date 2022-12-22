import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alunos' })
export class AlunosEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nome: string;
  @Column()
  endereco: string;
  @Column()
  telefone: string;
  @Column()
  foto: string;
}
