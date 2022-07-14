import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';
import { KakaoIntentId } from 'src/constant/kakao.constant';
import { KakaoReplyMaker } from 'src/kakao/kakao.type';

@Catch(InternalServerErrorException)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const body = new KakaoReplyMaker()
      .addBasicCard({
        description: '서버 내부 에러가 발생했습니다.',
        buttons: [
          {
            label: '다시시작',
            action: 'block',
            blockId: KakaoIntentId.WELCOME,
          },
        ],
      })
      .makeReply();

    response.json(body);
  }
}
