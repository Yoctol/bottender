import { CliContext } from '../..';
import Worker from '../../../message-queue/Worker';

const worker = async (ctx: CliContext): Promise<void> => {
  console.log(ctx);
  const worker = new Worker();
  await worker.start();
};

export default worker;
