import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpLogger } from './middleware/http-logger.middleware';
import { KakaoMiddleware } from './middleware/kakao.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLogger).forRoutes('*');
    consumer.apply(KakaoMiddleware).forRoutes('*');
  }
}
