// https://github.com/Charca/bootbot/pull/114/files
// https://stackoverflow.com/questions/48708410/typescript-error-an-export-assignment-cannot-be-used-in-a-module-with-other-exp

declare namespace BootBot {

  export interface BootBotOptions {
    accessToken: string;
    verifyToken: string;
    appSecret: string;
    broadcastEchoes?: boolean;
    webhook?: string;
    graphApiVersion?: string;
  }

  export type EventType =
    'message'
    | 'quick_reply'
    | 'attachment'
    | 'postback'
    | 'delivery'
    | 'read'
    | 'authentication'
    | 'referral'
    ;

  export type EventCallback = (payload: any, chat: Chat, data: any) => void;

  export interface SendApiOptions {
    typing?: boolean;
    onDelivery: EventCallback;
    onRead: EventCallback;
  }

  export interface QuickReplyMessage {
    text: string;
    quickReplies: string[];
  }

  export interface Button {
    type: 'postback';
    title: string;
    payload: any;
  }

  export interface ButtonMessage {
    text: string;
    buttons: Button[];
  }

  export interface ListElement {
    title: string;
    image_url: string;
    default_action: any;
  }

  export interface ListMessage {
    elements: ListElement[];
    buttons: Button[];
  }

  export interface Card extends ListElement {

  }

  export interface CardMessage {
    cards: Card[];
  }

  export interface AttachmentMessage {
    attachment: string;
    url: string;
  }

  export type MessageType =
    string
    | string[]
    | QuickReplyMessage
    | ButtonMessage
    | ListMessage
    | CardMessage
    | AttachmentMessage
    ;

  export type Action =
    'mark_seen'
    | 'typing_on'
    | 'typing_off'
    ;

  export interface UserProfile {
    first_name: string;
    last_name: string;
    profile_pic: string;
    locale: string;
    timezone: number;
    gender: string;
    last_ad_referral: {
      source: string;
      type: string;
      ad_id: string;
    }
  }

  export interface UserProfileInstagram {
    name: string;
    username: string;
    profile_pic: string;
  }

  export class Chat {
    say(message: string | string[] | MessageType, options?: SendApiOptions): Promise<any>;

    sendTextMessage(text: string, quickReplies?: string[], options?: SendApiOptions): Promise<any>;

    sendButtonTemplate(text: string, buttons: Button[], options?: SendApiOptions): Promise<any>;

    sendGenericTemplate(elements: Element[], options?: SendApiOptions): Promise<any>;

    sendListTemplate(elements: Element[], buttons: Button[], options?: SendApiOptions): Promise<any>;

    sendTemplate(payload: any, options?: SendApiOptions): Promise<any>;

    sendAttachment(type: string, url: string, quickReplies?: string[], options?: SendApiOptions): Promise<any>;

    sendAction(action: Action, options?: SendApiOptions): Promise<any>;

    sendMessage(message: any, options?: SendApiOptions): Promise<any>;

    sendProfileRequest(body: any, method: string): Promise<any>;

    sendTypingIndicator(milliseconds: number): Promise<any>;

    getUserProfile(): Promise<UserProfile>;
    getUserProfileInstagram(): Promise<UserProfile>;

    conversation(factory: (convo: Conversation) => void): Conversation;
  }

  export type ConversationCallback = (payload: any, convo: Conversation, data: any) => void;

  export class Conversation extends Chat {
    ask(question: string | string[] | MessageType,
      answer: ConversationCallback,
      callbacks?: {
        event: string;
        callback: EventCallback;
      }[],
      options?: SendApiOptions): Conversation;

    set(property: string, value: any): void;

    get(property: string): any;

    isActive(): boolean;

    isWaitingForAnswer(): boolean;

    stopWaitingForAnswer(): void;

    end(): void;

    module(factory: (bot: BootBot) => void): void;

  }
}

declare class BootBot {
  constructor(options: BootBot.BootBotOptions);

  start(port?: number): void;

  close(): void;

  on(event: BootBot.EventType, callback: BootBot.EventCallback): void;

  hear(keywords: string | RegExp | any[], callback: BootBot.EventCallback): BootBot;

  say(userId: string, message: string | string[] | BootBot.MessageType, options?: BootBot.SendApiOptions): Promise<any>;

  sendTextMessage(userId: string, text: string, quickReplies?: string[], options?: BootBot.SendApiOptions): Promise<any>;

  sendButtonTemplate(userId: string, text: string, buttons: BootBot.Button[], options?: BootBot.SendApiOptions): Promise<any>;

  sendGenericTemplate(userId: string, elements: Element[], options?: BootBot.SendApiOptions): Promise<any>;

  sendListTemplate(userId: string, elements: Element[], buttons: BootBot.Button[], options?: BootBot.SendApiOptions): Promise<any>;

  sendTemplate(userId: string, payload: any, options?: BootBot.SendApiOptions): Promise<any>;

  sendAttachment(userId: string, type: string, url: string, quickReplies?: string[], options?: BootBot.SendApiOptions): Promise<any>;

  sendAction(userId: string, action: BootBot.Action, options?: BootBot.SendApiOptions): Promise<any>;

  sendMessage(userId: string, message: any, options?: BootBot.SendApiOptions): Promise<any>;

  sendRequest(body: any, endpoint: string, method: string): Promise<any>;

  sendTypingIndicator(userId: string, milliseconds: number): Promise<any>;

  getUserProfile(userId: string): Promise<BootBot.UserProfile>;

  conversation(userId: string, factory: (convo: BootBot.Conversation) => void): BootBot.Conversation;

  setGreetingText(text: string): Promise<any>;

  setGetStartedButton(action: string | Function): Promise<any>;

  deleteGetStartedButton(): Promise<any>;

  setPersistentMenu(buttons: string[] | any[], disableInput?: boolean): Promise<any>;

  deletePersistentMenu(): Promise<any>;

  handleFacebookData(data: any): void;
}

// export default BootBot
// export { Chat }
export = BootBot;
