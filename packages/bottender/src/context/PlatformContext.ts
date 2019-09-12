import { Event } from './Event';

export interface PlatformContext {
  platform: string;
  event: Event;
  session: any;
  sendText: (text: string) => any;
}
