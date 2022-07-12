export type KakaoReply = {
  version: '2.0';
  template: {
    outputs: Output[];
    quickReplies?: Button[];
  };
};

type Output =
  | SimpleText
  | SimpleImage
  | { basicCard: BasicCard }
  | CommerceCard
  | ListCard
  | ItemCard
  | { carousel: Carousel };

/**
 * SimpleText(https://chatbot.kakao.com/docs/skill-response-format#simpletext)
 */
type SimpleText = {
  simpleText: {
    text: string;
    buttons?: Button[];
  };
};

/**
 * SimpleImage(https://chatbot.kakao.com/docs/skill-response-format#simpleimage)
 */
type SimpleImage = {
  simpleImage: {
    imageUrl: string;
    altText: string;
  };
};

/**
 * BasicCard(https://chatbot.kakao.com/docs/skill-response-format#basiccard)
 */
type BasicCard = {
  title?: string;
  description?: string;
  thumbnail?: Thumbnail;
  // profile | 미지원
  // social | 미지원
  buttons?: Button[]; // 최대 3개
};

/**
 * CommerceCard(https://chatbot.kakao.com/docs/skill-response-format#commercecard)
 */
type CommerceCard = {
  description: string;
  price: number;
  currency: string;
  discount?: number;
  thumbnails: Thumbnail[]; // 현재 1개만 가능
  profile?: Profile;
  buttons: Button[];
};

/**
 * ListCarad(https://chatbot.kakao.com/docs/skill-response-format#listcard)
 */
type ListCard = {
  header: ListItem;
  items: ListItem[]; // 최대 5개
  buttons: Button[]; // 최대 2개
};

type ListItem = {
  title: string;
  description?: string;
  imageUrl?: string;
  link?: Link;
};

/**
 * ItemCard(https://chatbot.kakao.com/docs/skill-response-format#itemcard)
 */
type ItemCard = {
  thumbnail?: ItemThumbnail;
  head?: ItemCardHead;
  profile?: ItemProfile;
  imageTitle?: ItemImageTitle;
  itemList: ItemList[];
  itemListAlignment?: 'left' | 'right';
  itemListSummary?: ItemListSummary;
  title?: string;
  description?: string;
  buttons: Button[];
  buttonLayout: 'vertical' | 'horizontal';
};

type ItemThumbnail = {
  imageUrl: string;
  width: number;
  height: number;
};

type ItemCardHead = {
  title: string;
};

type ItemProfile = {
  imageUrl?: string;
  width?: number;
  height?: number;
  title: string;
};

type ItemImageTitle = {
  title: string;
  description?: string;
  imageUrl?: string;
};

type ItemList = {
  title: string;
  description: string;
};

type ItemListSummary = {
  title: string;
  description: string;
};

/**
 * Carousel(https://chatbot.kakao.com/docs/skill-response-format#carousel)
 */

type Carousel = {
  type: 'basicCard' | 'commerceCard' | 'listCard' | 'itemCard';
  items: BasicCard[] | CommerceCard[] | ListCard[] | ItemCard[]; // 최대 10개, ListCard는 최대 5개
  header?: CarouselHeader; // ListCard는 지원하지 않음
};

type CarouselHeader = {
  title: string;
  description: string;
  thumbnail: Thumbnail;
};

/**
 * Thumbnail(https://chatbot.kakao.com/docs/skill-response-format#thumbnail)
 */

type ThumbnailLink = {
  web: string;
};
type Thumbnail =
  | {
      imageUrl: string;
      link?: ThumbnailLink;
      fixedRatio?: boolean;
    }
  | {
      imageUrl: string;
      link?: ThumbnailLink;
      fixedRatio: boolean;
      width: number;
      height: number;
    };

/**
 * Button(https://chatbot.kakao.com/docs/skill-response-format#button)
 */
type Button = (
  | BlockButton
  | MessageButton
  | LinkButton
  | PhoneButton
  | ShareButton
  | AddChannelButton
) & {
  label: string;
  extra?: object;
};

type BlockButton = {
  action: 'block';
  blockId: string;
};

type MessageButton = {
  action: 'message';
  messageText: string;
};

type LinkButton = {
  action: 'webLink';
  webLinkUrl: string;
};

type PhoneButton = {
  action: 'phone';
  phoneNumber: string;
};

type ShareButton = {
  action: 'share';
};

type AddChannelButton = {
  action: 'addChannel';
};

/**
 * Link(https://chatbot.kakao.com/docs/skill-response-format#link)
 */
type Link = {
  pc?: string;
  mobile?: string;
  web?: string;
};

/**
 * Profile(https://chatbot.kakao.com/docs/skill-response-format#profile)
 */
type Profile = {
  nickname: string;
  imageUrl?: string;
};

export class KakaoReplyMaker {
  private outputs: Output[] = [];
  private quickReplies?: Button[] = [];

  addSimpleText(text: string, buttons?: Button[]) {
    const output: SimpleText = {
      simpleText: {
        text,
      },
    };

    if (buttons) {
      output.simpleText.buttons = buttons;
    }

    this.outputs.push(output);
    return this;
  }

  addSimpleImage(imageUrl: string, altText?: string) {
    const output: SimpleImage = {
      simpleImage: {
        imageUrl,
        altText,
      },
    };
    this.outputs.push(output);
    return this;
  }

  addBasicCard(basicCard: BasicCard) {
    this.outputs.push({
      basicCard,
    });
    return this;
  }

  addCarousel(basicCards: BasicCard[]) {
    this.outputs.push({
      carousel: {
        type: 'basicCard',
        items: basicCards,
      },
    });
    return this;
  }

  addQuickReply(button: Button) {
    this.quickReplies.push(button);
    return this;
  }

  makeReply(): KakaoReply {
    return {
      version: '2.0',
      template: {
        outputs: this.outputs,
        quickReplies: this.quickReplies,
      },
    };
  }
}
