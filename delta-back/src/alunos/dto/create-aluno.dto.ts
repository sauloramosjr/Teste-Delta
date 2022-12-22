import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateAlunoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do Aluno',
  })
  nome: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Endereço do Aluno',
  })
  endereco: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Telefone do Aluno',
  })
  telefone: string;
  @ApiProperty({
    description: 'Foto do Aluno',
  })
  foto: any;
}
