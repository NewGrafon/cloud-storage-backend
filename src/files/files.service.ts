import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FileEntity} from "./entities/file.entity";
import {Repository} from "typeorm";
import {FileTypes} from "../enums/file-types.enum";

@Injectable()
export class FilesService {

  constructor(
      @InjectRepository(FileEntity)
      private repository: Repository<FileEntity>
  ) {

  }

  async findAll(userId: number, fileType: FileTypes) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (fileType === FileTypes.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }

    if (fileType === FileTypes.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }

    return await qb.getMany();
  }

  async create(file: Express.Multer.File, userId: number) {
    return await this.repository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId }
    });
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');

    const qb = this.repository.createQueryBuilder('file');

    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });

    return await qb.softDelete().execute();
  }
}
