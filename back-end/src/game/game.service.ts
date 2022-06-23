import { Injectable } from '@nestjs/common';

import { S3FileService } from '../s3-file/s3-file.service';
import { PrismaService } from '../prisma/prisma.service';
import { Game } from '@prisma/client';
import { GameCreateInput } from './game.resolver';

@Injectable()
export class GameService {
  constructor(
    private s3Service: S3FileService,
    private prisma: PrismaService,
  ) {}
  async game(id: number): Promise<Game> {
    return await this.prisma.game.findUnique({ where: { id } });
  }
  async allGames(): Promise<Array<Game>> {
    console.log('all game');
    return await this.prisma.game.findMany();
  }

  async createGame(data: GameCreateInput): Promise<Game> {
    const duplicated = await this.prisma.game.findFirst({
      where: {
        title: data.title,
        singer: data.singer,
      },
    });

    if (duplicated != null) {
      return await this.prisma.game.update({
        where: {
          id: duplicated.id,
        },
        data: data,
      });
    }

    return await this.prisma.game.create({
      data: data,
    });
  }

  async writeGameFileLink(id: number, link: string): Promise<Game> {
    return await this.prisma.game.update({
      where: { id },
      data: {
        musicFileLinkUrl: link,
      },
    });
  }

  async updateGame(id: number, data: Game) {
    return await this.prisma.game.update({
      where: { id },
      data: data,
    });
  }

  async deleteGame(id: number) {
    return await this.prisma.game.delete({
      where: { id },
    });
  }
}
