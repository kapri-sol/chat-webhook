import { UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { KakaoIntentId } from './constant/kakao.constant';
import { KakaoController, KakaoIntent } from './decorator/kakao.decorator';
import { AuthGuard } from './guard/auth.guard';
import { KakaoReply, KakaoReplyMaker } from './kakao/kakao.type';

@UseGuards(AuthGuard)
@KakaoController()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @KakaoIntent(KakaoIntentId.WELCOME)
  welcome(): KakaoReply {
    return new KakaoReplyMaker()
      .addSimpleText('안녕하세요!')
      .addBasicCard({
        description: '안녕하세요!',
        buttons: [
          {
            action: 'block',
            label: '인증 확인하기',
            blockId: KakaoIntentId.CHECK_AUTH,
          },
        ],
      })
      .makeReply();
  }

  @KakaoIntent(KakaoIntentId.FALLBACK)
  fallback(): KakaoReply {
    return new KakaoReplyMaker()
      .addBasicCard({
        description: '폴백 답변입니다.',
        buttons: [
          {
            action: 'block',
            label: '시작',
            blockId: KakaoIntentId.WELCOME,
          },
          {
            action: 'block',
            label: '인증 확인',
            blockId: KakaoIntentId.CHECK_AUTH,
          },
        ],
      })
      .makeReply();
  }
}
