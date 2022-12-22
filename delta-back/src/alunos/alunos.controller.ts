import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  Delete,
  UseInterceptors,
  StreamableFile,
} from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadedFile } from '@nestjs/common/decorators';
import { createReadStream, unlinkSync } from 'fs';
import { Response } from 'express';
@ApiTags('Alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, foto, calback) => {
          const fileName = foto.originalname;

          calback(null, fileName.replace(/\s/g, '').replace('/./g', ''));
        },
      }),
      fileFilter(req, foto, callback) {
        ['image/png', 'image/jpg', 'image/jpeg'].some(
          (formatoAceito) => formatoAceito == foto.mimetype,
        )
          ? callback(null, true)
          : callback(null, false);
      },
    }),
  )
  @Post()
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlunoDto: CreateAlunoDto,
  ) {
    const aluno = { ...createAlunoDto, foto: file.filename };
    return this.alunosService.create(aluno);
  }

  @Get()
  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(+id);
  }

  @Get('profile-image/:foto')
  async getImage(@Param('foto') foto: string, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'uploads/' + foto));
  }

  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, foto, calback) => {
          const fileName = foto.originalname;

          calback(null, fileName.replace(/\s/g, '').replace('/./g', ''));
        },
      }),
      fileFilter(req, foto, callback) {
        ['image/png', 'image/jpg', 'image/jpeg'].some(
          (formatoAceito) => formatoAceito == foto.mimetype,
        ) || !foto
          ? callback(null, true)
          : callback(null, false);
      },
    }),
  )
  @Patch(':id')
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    let aluno = updateAlunoDto;
    if (!!file) {
      unlinkSync('./uploads/' + updateAlunoDto.oldImage);
      aluno = { ...updateAlunoDto, foto: file.filename };
      delete aluno.oldImage;
    }
    return this.alunosService.update(+id, aluno);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunosService.remove(+id);
  }
}
