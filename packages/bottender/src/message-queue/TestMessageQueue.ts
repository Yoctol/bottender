import MessageQueue from './MessageQueue';

class TestMessageQueue implements MessageQueue {
  constructor(_:{}){

  }

  public async connect() {}

  public async disconnect() {}

  public async sendMessage(_: string): Promise<boolean> {
    return true;
  }

  public async consumeMessage(
    _: (message: string) => Promise<boolean>
  ): Promise<boolean> {
    return true;
  }
}

export default TestMessageQueue;
