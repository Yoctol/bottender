import Server from './Server';

// TODO: add watcher
class DevServer extends Server {
  public async prepare(): Promise<void> {
    // TODO: implement more dev features here
    return super.prepare();
  }
}

export default DevServer;
