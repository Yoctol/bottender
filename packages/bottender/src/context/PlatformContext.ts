import { Event } from './Event';

export interface PlatformContext {
  +platform: string;
  +event: Event;
  +session: ?{};
  +sendText: (text: string) => any;
}
