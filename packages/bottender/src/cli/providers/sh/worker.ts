import Worker from '../../../message-queue/Worker';
import { CliContext } from '../..';

const worker = async (ctx: CliContext): Promise<void> => {
  console.log(ctx);
  const w = new Worker();
  await w.start();
};

export default worker;
