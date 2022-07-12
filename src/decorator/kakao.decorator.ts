import {
  applyDecorators,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { KakaoIntentId } from 'src/constant/kakao.constant';
import { KakaoInterceptor } from 'src/interceptor/kakao.interceptor';

export const KakaoController = () => {
  return applyDecorators(
    UseInterceptors(KakaoInterceptor),
    Controller('kakao'),
  );
};

export const KakaoIntent = (path?: KakaoIntentId) => {
  return Post(path);
};
