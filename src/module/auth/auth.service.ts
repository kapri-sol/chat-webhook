import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { AUTH_NUMBER_CACHE_KEY, AUTH_NUMBER_EXPIRE_TIME, AUTH_NUMBER_LENGTH } from 'src/constant/auth.constant';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    sgMail.setApiKey(this.configService.get<string>('MAIL_API_KEY'));
  }

  generateAuthNumber(): string {
    const maxNumber = parseInt('9'.repeat(AUTH_NUMBER_LENGTH));
    return crypto.randomInt(maxNumber).toString();
  }

  setAuthNumber(userUid: bigint, authNumber: string) {
    return this.cacheManager.set(`${AUTH_NUMBER_CACHE_KEY}:${userUid.toString()}`, authNumber, {
      ttl: AUTH_NUMBER_EXPIRE_TIME,
    });
  }

  getAuthNumber(userUid: bigint): Promise<string> {
    return this.cacheManager.get(`${AUTH_NUMBER_CACHE_KEY}:${userUid.toString()}`);
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

    await this.setAuthNumber(userUid, authNumber).then(console.log);
  }

  async validateAuthNumber(userUid: bigint, authNumberToValidate: string): Promise<boolean> {
    const savedAuthNumber = await this.getAuthNumber(userUid);
    return savedAuthNumber === authNumberToValidate.toString();
  }
}
