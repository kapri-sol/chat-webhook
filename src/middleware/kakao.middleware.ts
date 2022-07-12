import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { KakaoDTO } from 'src/kakao/kakao.dto';

export class KakaoMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const kakao: KakaoDTO = req.body;

    if (!(kakao?.bot?.id && kakao?.intent?.id && kakao.userRequest.user.id)) {
      next();
      return;
    }

    // 경로 라우팅
    req.url = `/kakao/${kakao.intent.id}`;

    res.locals = {
      id: kakao.userRequest.user.id,
      utterance: kakao.userRequest.utterance,
      isFriend: kakao.userRequest.user.properties?.isFriend || false,
      extra: kakao.action.clientExtra,
    };

    next();
  }
}
