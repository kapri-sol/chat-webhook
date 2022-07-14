import { KakaoFallbackRoute, KakaoIntentId } from 'src/constant/kakao.constant';
import { LocalData, LocalDataInfo } from 'src/decorator/kakao-user.decorator';
import { KakaoController, KakaoIntent } from 'src/decorator/kakao.decorator';
import { KakaoReply, KakaoReplyMaker } from 'src/kakao/kakao.type';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@KakaoController()
export class AuthController {
  constructor(private readonly userServicie: UserService, private readonly authService: AuthService) {}

  @KakaoIntent(KakaoIntentId.START_AUTH)
  async startAuth(@LocalData() localData: LocalDataInfo) {
    await this.userServicie.setRoute(localData.user.userUid, KakaoFallbackRoute.SEND_AUTH_MAIL);

    return new KakaoReplyMaker().addSimpleText('이메일 주소를 입력해주세요!').makeReply();
  }

}
