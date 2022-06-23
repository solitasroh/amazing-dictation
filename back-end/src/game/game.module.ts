import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { S3FileService } from '../s3-file/s3-file.service';
import { GameService } from './game.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [GameResolver, S3FileService, GameService, PrismaService],
})
export class GameModule {}
