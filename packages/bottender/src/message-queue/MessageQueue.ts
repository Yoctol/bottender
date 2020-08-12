interface MessageQueue {
  connect(): void;

  disconnect(): void;

  sendMessage(message: string): Promise<boolean>;

  consumeMessage(
    doWork: (message: string) => Promise<boolean>
  ): Promise<boolean>;
}

export default MessageQueue;
