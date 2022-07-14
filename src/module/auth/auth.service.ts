import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
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
}
