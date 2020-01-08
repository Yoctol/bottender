import Context from '../context/Context';
import { Client, Event } from '../types';

export default class SimulatedContext<
  C extends Client,
  E extends Event
> extends Context<C, E> {
  _platform: string;

  constructor(options: any) {
    super(options);

    this._platform = options.platform;
  }

  get platform() {
    return this._platform;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendText() {}
}
