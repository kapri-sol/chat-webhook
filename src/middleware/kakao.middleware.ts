import { NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from 'src/entity/user.entity';
import { KakaoDTO } from 'src/kakao/kakao.dto';
import { Repository } from 'typeorm';

export class KakaoMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const kakao: KakaoDTO = req.body;

    if (!(kakao?.bot?.id && kakao?.intent?.id && kakao.userRequest.user.id)) {
      next();
      return;
    }

    let user = await this.userRepository.findOne({
      where: {
        kakaoUserId: kakao.userRequest.user.id,
      },
    });

    if (!user) {
      user = this.userRepository.create({
        kakaoUserId: kakao.userRequest.user.id,
      });

      await this.userRepository.save(user);
    }

    // 경로 라우팅
    req.url = `/kakao/${kakao.intent.id}`;

    res.locals = {
      id: kakao.userRequest.user.id,
      utterance: kakao.userRequest.utterance,
      isFriend: kakao.userRequest.user.properties?.isFriend || false,
      extra: kakao.action.clientExtra,
      user,
    };

    next();
  }
}
