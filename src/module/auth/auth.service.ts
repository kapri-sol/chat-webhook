import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { AUTH_NUMBER_CACHE_KEY, AUTH_NUMBER_EXPIRE_TIME, AUTH_NUMBER_LENGTH } from 'src/constant/auth.constant';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { AuthDataDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly userService: UserService,
  ) {
    sgMail.setApiKey(this.configService.get<string>('MAIL_API_KEY'));
  }

  generateAuthNumber(): string {
    const maxNumber = parseInt('9'.repeat(AUTH_NUMBER_LENGTH));
    return crypto.randomInt(maxNumber).toString();
  }

  setAuthData(userUid: bigint, email: string, authNumber: string) {
    const authData = JSON.stringify({
      email,
      authNumber,
    });

    return this.cacheManager.set(`${AUTH_NUMBER_CACHE_KEY}:${userUid.toString()}`, authData, {
      ttl: AUTH_NUMBER_EXPIRE_TIME,
    });
  }

  getAuthData(userUid: bigint): Promise<AuthDataDto> {
    return this.cacheManager
      .get(`${AUTH_NUMBER_CACHE_KEY}:${userUid.toString()}`)
      .then((authData: string) => JSON.parse(authData));
  }

  async sendMail(userUid: bigint, emailAddress: string) {
    const authNumber = this.generateAuthNumber();

    await sgMail
      .send({
        to: emailAddress,
        from: 'tothelunar92@gmail.com',
        replyTo: 'tothelunar92@gmail.com',
        subject: '인증메일',
        text: `인증숫자: ${authNumber}`,
      })
      .then(console.log)
      .catch(console.error);

    await this.setAuthData(userUid, emailAddress, authNumber).then(console.log);
  }

  async validateAuthNumber(userUid: bigint, authNumberToValidate: string): Promise<boolean> {
    const authData = await this.getAuthData(userUid);

    if (!authData) {
      await this.userService.initRoute(userUid);
      throw new UnauthorizedException();
    }

    const { email, authNumber } = authData;

    const isValid = authNumber === authNumberToValidate.toString();

    if (!isValid) {
      return false;
    }

    await this.userService.completAuth(userUid, email);

    return true;
  }
}
