import { PartialType } from '@nestjs/mapped-types';
import { CreateAlunoDto } from './create-aluno.dto';
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Foto antiga do Aluno',
  })
  oldImage?: string;
}
