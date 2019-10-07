export interface PlatformContext {
  readonly platform: string;

  sendText: (text: string) => any | Promise<any>;
}
