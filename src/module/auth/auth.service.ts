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
}
