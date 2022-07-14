import { KakaoController, KakaoIntent } from 'src/decorator/kakao.decorator';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@KakaoController()
export class AuthController {
  constructor(private readonly userServicie: UserService, private readonly authService: AuthService) {}
}
