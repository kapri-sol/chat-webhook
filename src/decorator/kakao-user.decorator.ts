import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/entity/user.entity';

export const LocalData = createParamDecorator((key: string, ctx: ExecutionContext): LocalDataInfo => {
  const res = ctx.switchToHttp().getResponse();
  return res.locals;
});

export class LocalDataInfo {
  id: string;
  utterance: string;
  isFriend: boolean;
  extra: object;
  user: User;
}
