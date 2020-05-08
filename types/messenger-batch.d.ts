import { MessengerClient, MessengerTypes } from 'messaging-api-messenger';

declare module 'messenger-batch' {
  export function getErrorMessage(err: Error): string;

  export function isError613(err: Error): boolean;

  export type BatchConfig = {
    delay?: number;
    shouldRetry?: () => boolean;
    retryTimes?: number;
  };

  export class MessengerBatchQueue {
    constructor(client: MessengerClient, options?: BatchConfig);

    queue: any[];

    push(request: MessengerTypes.BatchItem): Promise<any>;

    flush(): Promise<any>;

    stop(): void;
  }
}
