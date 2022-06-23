import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User, UserKakao, UserGoogle } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async isUserExists(id): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        kakaoId: id,
      },
    });

    return user != null;
  }

  async isGoogleUserExists(googleId): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    return user != null;
  }

  async getUserFromGoogle(id: number): Promise<UserGoogle | null> {
    return await this.prisma.userGoogle.findUnique({
      where: { id },
    });
  }

  async getUserFromKakao(id: number): Promise<UserKakao | null> {
    return await this.prisma.userKakao.findUnique({
      where: { id },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUserFromGoogle(user: UserGoogle): Promise<User> {
    const googleUser = await this.prisma.userGoogle.create({
      data: user,
    });

    return await this.prisma.user.create({
      data: {
        role: Role.User,
        lastLoggedIn: new Date(),
        userGoogle: {
          connect: {
            id: googleUser.id,
          },
        },
      },
    });
  }

  async createUserFromKakao(user: UserKakao): Promise<User> {
    const kakaoUser = await this.prisma.userKakao.create({
      data: user,
    });

    return await this.prisma.user.create({
      data: {
        role: Role.User,
        lastLoggedIn: new Date(),
        userKakao: {
          connect: {
            id: kakaoUser.id,
          },
        },
      },
    });
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
