import {
  Consumer,
  ConsumerConfig,
  Kafka,
  KafkaConfig,
  Producer,
  ProducerConfig,
} from 'kafkajs';

import MessageQueue from './MessageQueue';

class KafkaMessageQueue implements MessageQueue {
  kafkaConfig: KafkaConfig;

  consumerConfig: ConsumerConfig;

  producerConfig: ProducerConfig;

  kafka: Kafka;

  consumer: Consumer;

  producer: Producer;

  constructor(
    kafkaConfig: KafkaConfig = { brokers: ['localhost:9092'] },
    consumerConfig: ConsumerConfig = { groupId: 'bottender' },
    producerConfig: ProducerConfig = {}
  ) {
    console.log('new KafkaMessageQueue()');
    this.kafkaConfig = kafkaConfig;
    this.kafkaConfig.clientId = this.kafkaConfig.clientId ?? 'bottender-app';
    this.kafkaConfig.brokers = this.kafkaConfig.brokers ?? ['localhost:9092'];
    this.producerConfig = producerConfig;
    this.consumerConfig = consumerConfig;

    this.kafka = new Kafka(this.kafkaConfig);
    this.producer = this.kafka.producer(this.producerConfig);
    this.consumer = this.kafka.consumer(this.consumerConfig);
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
