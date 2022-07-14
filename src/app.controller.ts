import { AppService } from './app.service';
import { KakaoIntentId } from './constant/kakao.constant';
import { KakaoController, KakaoIntent } from './decorator/kakao.decorator';
import { KakaoReply, KakaoReplyMaker } from './kakao/kakao.type';

@KakaoController()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @KakaoIntent(KakaoIntentId.WELCOME)
  welcome(): KakaoReply {
    return new KakaoReplyMaker().addSimpleText('안녕하세요!').makeReply();
  }

  @KakaoIntent(KakaoIntentId.FALLBACK)
  getHello(): KakaoReply {
    return new KakaoReplyMaker().addSimpleText('안녕하세요!').makeReply();
  }
}
