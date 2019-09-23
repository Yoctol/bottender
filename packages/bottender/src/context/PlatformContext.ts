export interface PlatformContext {
  readonly platform: string;

  sendText: (text: string) => Promise<any>;
}
