import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoFallbackRoute } from 'src/constant/kakao.constant';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async setRoute(userUid: bigint, route: KakaoFallbackRoute): Promise<void> {
    await this.userRepository.update(
      {
        userUid,
      },
      {
        route,
      },
    );
  }

  async initRoute(userUid: bigint): Promise<void> {
    await this.userRepository.update(
      {
        userUid,
      },
      {
        route: null,
      },
    );
  }

  async completAuth(userUid: bigint, email: string) {
    await this.userRepository.update(
      {
        userUid,
      },
      {
        email,
        route: null,
      },
    );
  }
}
