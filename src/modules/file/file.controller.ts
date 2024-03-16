import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Inject,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fileOption } from '../../lib/file';
import { CreateFileDto } from './dto/create-file.dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(
    @Inject('IFileService') private readonly fileService: FileService,
  ) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('upload-once')
  @UseInterceptors(FileInterceptor('file', fileOption))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    return await this.fileService.create(file, dto);
  }
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ['files']: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('multiupload')
  @UseInterceptors(FilesInterceptor('files', 2, fileOption))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.createMultiple(files);
  }
  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.delete(+id);
  }
}
