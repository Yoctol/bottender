import {
  Consumer,
  Kafka,
  Producer,
} from 'kafkajs';

import MessageQueue from './MessageQueue';
import { KafkaMessageQueueConfig } from '..';

class KafkaMessageQueue implements MessageQueue {
  config: KafkaMessageQueueConfig;

  kafka: Kafka;

  consumer: Consumer;

  producer: Producer;

  constructor(config: KafkaMessageQueueConfig = {
    kafka: { brokers: ['localhost:9092'] },
    consumer: { groupId: 'bottender' },
    producer: {}
  }){
    console.log('new KafkaMessageQueue()');
    this.config = config ?? {};
    this.config.kafka.clientId = this.config.kafka.clientId ?? 'bottender-app';
    this.config.kafka.brokers = this.config.kafka.brokers ?? ['localhost:9092'];

    this.kafka = new Kafka(this.config.kafka);
    this.producer = this.kafka.producer(this.config.producer);
    this.consumer = this.kafka.consumer(this.config.consumer);
  }

  public async connect() {
    console.log('kafka.connect()');
    await this.producer.connect();
    await this.consumer.connect();
  }

  public async disconnect() {
    console.log('kafka.disconnect()');
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  public async sendMessage(message = 'Hello World!'): Promise<boolean> {
    console.log(`kafka.sendMessage(${message})`);
    const response = await this.producer.send({
      topic: 'bottender',
      messages: [{ value: message }],
    });
    return response[0].errorCode === 0;
  }

  public async consumeMessage(
    doWork: (message: string) => Promise<boolean>
  ): Promise<boolean> {
    console.log(`kafka.consumeMessage()`);
    await this.consumer.subscribe({ topic: 'bottender', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async (payload) => {
        console.log(`kafka.consumeMessage.eachMessage:`);
        console.log(JSON.stringify(payload, null, 2));
        const message = payload.message.value?.toString();
        console.log(`message: ${message}`);
        if (message) {
          await doWork(message);
        }
      },
    });
    console.log(' [*] Waiting for messages. To exit press CTRL+C');
    return true;
  }
}

export default KafkaMessageQueue;
