class KakaoBot {
  id: string;
  name: string;
}

class KakaoIntent {
  id: string;
  name: string;
  extra: KakaoExtra;
}

class KakaoExtra {
  reason: KakaoExtraReason;
}

class KakaoExtraReason {
  code: number;
  message: string;
}

class KakaoActionDetailParmasAuth {
  groupName: string;
  origin: string;
  value: string;
}
class KakaoActionDetailParams {
  auth: KakaoActionDetailParmasAuth;
}

class KakaoAction {
  id: string;
  name: string;
  params: object;
  detailParams: KakaoActionDetailParams;
  clientExtra: object;
}

class KakaoUser {
  id: string;
  type: string;
  properties: KakaoUserProperties;
}

class KakaoUserRequest {
  block: KakaoBlock;
  user: KakaoUser;
  utterance: string;
  params: object;
  lang: KakaoUserLang;
  timezone: KakaoUserTimezone;
}

type KakaoUserLang = 'kr';

type KakaoUserTimezone = 'Asia/Seoul';

class KakaoBlock {
  id: string;
  name: string;
}

class KakaoUserProperties {
  botUserKey: string;
  isFriend?: boolean;
  appUserId?: bigint;
  plusfriendUserKey?: string;
  deliveryComicsAlim?: string;
}

export class KakaoDTO {
  bot: KakaoBot;
  intent: KakaoIntent;
  action: KakaoAction;
  userRequest: KakaoUserRequest;
}
