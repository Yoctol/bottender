import MessageQueue from '../message-queue/MessageQueue';

import getBottenderConfig from './getBottenderConfig';
import KafkaMessageQueue from '../message-queue/KafkaMessageQueue';
import RabbitMessageQueue from '../message-queue/RabbitMessageQueue';
import TestMessageQueue from '../message-queue/TestMessageQueue';

const messageQueueConstructors = {
  kafka: KafkaMessageQueue,
  rabbitMessageQueue: RabbitMessageQueue,
  test: TestMessageQueue,
  none: undefined,
}

function getMessageQueue(): MessageQueue | undefined{
  const { messageQueue } = getBottenderConfig();

  const driver = messageQueue?.driver ?? 'none';

  const config = (messageQueue && messageQueue[driver]) ?? {};

  const messageQueueConstructor = messageQueueConstructors[driver];

  if(messageQueueConstructor){
    return new messageQueueConstructor(config);
  }else{
    return undefined;
  }
}

export default getMessageQueue;
