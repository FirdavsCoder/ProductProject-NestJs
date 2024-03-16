import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './file.repository';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { FileNotFound } from './exception/file.exception';
import { unlinkSync } from 'fs';

@Injectable()
export class FileService {
  constructor(
    @Inject('IFileRepository') private readonly fileRepository: FileRepository,
  ) {}
  async create(
    file: Express.Multer.File,
    createFileDto: CreateFileDto,
  ): Promise<ResData<FileEntity>> {
    const insertFIle = new FileEntity();
    if (createFileDto.fileName) {
      insertFIle.name = createFileDto.fileName;
    }
    insertFIle.name = file.originalname;
    insertFIle.location = file.path;
    insertFIle.mimetype = file.mimetype;
    insertFIle.size = file.size;
    const created = await this.fileRepository.create(insertFIle);
    return new ResData<FileEntity>('file created', 201, created);
  }

  async createMultiple(
    files: Array<Express.Multer.File>,
  ): Promise<ResData<FileEntity[]>> {
    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const insertFile = new FileEntity();
      insertFile.name = file.originalname;
      insertFile.location = file.path;
      insertFile.mimetype = file.mimetype;
      insertFile.size = file.size;
      newFiles.push(insertFile);
    }
    const created = await this.fileRepository.createMultiple(newFiles);
    return new ResData<Array<FileEntity>>('files created', 201, created);
  }

  async findAll(): Promise<ResData<FileEntity[]>> {
    const res = await this.fileRepository.findAll();
    return new ResData<Array<FileEntity>>('all files', 200, res);
  }

  async findOne(id: ID): Promise<ResData<FileEntity>> {
    const foundFile = await this.fileRepository.findOneById(id);
    if (!foundFile) {
      throw new FileNotFound();
    }
    return new ResData<FileEntity>('file found', 200, foundFile);
  }

  async delete(id: ID): Promise<ResData<FileEntity>> {
    await this.findOne(id);
    const deleted = await this.fileRepository.delete(id);
    unlinkSync(deleted.location);
    return new ResData<FileEntity>('File deleted', 200, deleted);
  }
}
