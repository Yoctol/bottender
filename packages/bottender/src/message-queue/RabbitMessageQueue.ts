import amqp from 'amqplib';

import MessageQueue from './MessageQueue';

class RabbitMessageQueue implements MessageQueue {
  aqmpPath: string;

  queueName: string;

  connection?: amqp.Connection;

  channel?: amqp.Channel;

  constructor({ queueName = 'bottender', aqmpPath = 'amqp://localhost' } = {}) {
    this.aqmpPath = aqmpPath;
    this.queueName = queueName;
  }

  public async connect() {
    if (this.connection && this.channel) {
      return;
    }
    this.connection = await amqp.connect(this.aqmpPath);
    this.channel = await this.connection.createChannel();
  }

  public async disconnect() {
    await this.channel?.close();
    await this.connection?.close();
    this.connection = undefined;
    this.channel = undefined;
  }

  public async sendMessage(message = 'Hello World!'): Promise<boolean> {
    if (this.connection === undefined || this.channel === undefined) {
      console.log('Please call connect first.');
      return false;
    }

    await this.channel.assertQueue(this.queueName, { durable: true });
    const isSuccess = await this.channel.sendToQueue(
      this.queueName,
      Buffer.from(message),
      { deliveryMode: true }
    );
    console.log(`Sent to ${this.queueName}: ${message}`);
    return isSuccess;
  }

  public async consumeMessage(
    doWork: (message: string) => Promise<boolean>
  ): Promise<boolean> {
    if (this.connection === undefined || this.channel === undefined) {
      console.log('Please call connect first.');
      return false;
    }

    console.log(`Listen to ${this.queueName}`);
    await this.channel.assertQueue(this.queueName, { durable: true });
    this.channel.prefetch(1);
    await this.channel.consume(
      this.queueName,
      async (message) => {
        if (message) {
          const body = message.content.toString();
          const isDone = await doWork(body);
          if (isDone) {
            // eslint-disable-next-line no-unused-expressions
            this.channel?.ack(message);
          }
        }
      },
      { noAck: false }
    );

    console.log(' [*] Waiting for messages. To exit press CTRL+C');
    return true;
  }
}

export default RabbitMessageQueue;
