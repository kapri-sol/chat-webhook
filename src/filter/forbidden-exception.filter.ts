import { ArgumentsHost, Catch, ExceptionFilter, ForbiddenException } from '@nestjs/common';
import { Response } from 'express';
import { KakaoIntentId } from 'src/constant/kakao.constant';
import { KakaoReplyMaker } from 'src/kakao/kakao.type';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const body = new KakaoReplyMaker()
      .addBasicCard({
        description: '인증이 필요합니다!',
        buttons: [
          {
            label: '사용자 인증',
            action: 'block',
            blockId: KakaoIntentId.START_AUTH,
          },
        ],
      })
      .makeReply();

    response.json(body);
  }
}
