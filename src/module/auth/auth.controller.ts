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

  @KakaoIntent(KakaoFallbackRoute.SEND_AUTH_MAIL)
  async sendMail(@LocalData() localData: LocalDataInfo) {
    const {
      utterance: emailAddress,
      user: { userUid },
    } = localData;

    try {
      await this.authService.sendMail(userUid, emailAddress);
      await this.userServicie.setRoute(userUid, KakaoFallbackRoute.VALIDATE_AUTH_NUM);
    } catch (err) {
      console.error(err);
    }

    return new KakaoReplyMaker().addSimpleText('인증숫자를 입력해주세요!').makeReply();
  }

  @KakaoIntent(KakaoFallbackRoute.VALIDATE_AUTH_NUM)
  async validateAuthNum(@LocalData() localData: LocalDataInfo): Promise<KakaoReply> {
    const {
      utterance: authNumber,
      user: { userUid },
    } = localData;

    try {
    const isValid = await this.authService.validateAuthNumber(userUid, authNumber);

    if (isValid) {
        return new KakaoReplyMaker()
          .addBasicCard({
            description: '인증되었습니다!',
            buttons: [
              {
                action: 'block',
                label: '시작하기',
                blockId: KakaoIntentId.WELCOME,
              },
            ],
          })
          .makeReply();
    } else {
        return new KakaoReplyMaker().addSimpleText('인증이 실패했습니다.\n다시 입력해주세요.').makeReply();
      }
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return new KakaoReplyMaker()
          .addBasicCard({
            description: '인증이 가능한 시간이 지났습니다. .\n다시 인증해주세요',
            buttons: [
              {
                action: 'block',
                label: '다시 인증하기',
                blockId: KakaoIntentId.START_AUTH,
              },
              {
                action: 'block',
                label: '처음으로',
                blockId: KakaoIntentId.WELCOME,
              },
            ],
          })
          .makeReply();
      }
      throw err;
    }
    }
  }
}
