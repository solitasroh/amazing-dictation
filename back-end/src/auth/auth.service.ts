import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { KakaoProfileDto } from './dto/kakao-profile.dto';
import { GoogleProfileDto } from './dto/google-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signIn(username, sub) {
    const payload = {
      username,
      sub,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginWithGoogle(req: any) {
    if (!req.user) {
      throw new BadRequestException();
    }
    const user: GoogleProfileDto = req.user;
    // 이미 유저가 존재한다면, 바로 로그인
    // 유저가 존재하지 않으면, db에 추가 후 로그인
    const findUser = await this.usersService.isGoogleUserExists({
      googleId: user.id,
    });

    if (findUser) {
      const googleUser = await this.usersService.getUserFromGoogle(user.id);
      return this.signIn(googleUser.email, googleUser.id);
    }

    const dbUser = await this.usersService.createUserFromGoogle({
      id: user.id,
      email: user.email,
      thumbUrl: user.picture,
    });

    if (dbUser == null) {
      return null;
    }

    return this.signIn(user.email, user.id);
  }

  async loginWithKakao(req: any) {
    if (!req.user) {
      return 'no user from kakao';
    }
    const {
      id,
      nickname,
      profile_image_url,
      thumbnail_image_url,
    }: KakaoProfileDto = req.user;
    // 이미 유저가 존재한다면, 바로 로그인
    // 유저가 존재하지 않으면, db에 추가 후 로그인
    const findUser = await this.usersService.isUserExists(id);

    if (findUser) {
      const kakaoUser = await this.usersService.getUserFromKakao(id);
      return this.signIn(kakaoUser.userName, kakaoUser.id);
    }

    const dbUser = await this.usersService.createUserFromKakao({
      id: id,
      userName: nickname,
      thumbUrl: thumbnail_image_url,
      profileUrl: profile_image_url,
    });

    if (dbUser == null) {
      return null;
    }

    return this.signIn(nickname, id);
  }
}
