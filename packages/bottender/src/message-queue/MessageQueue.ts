import amqp from 'amqplib';

class MessageQueue {
  aqmpPath: string;
  connection?: amqp.Connection;
  channel?: amqp.Channel;

  constructor({ aqmpPath = 'amqp://localhost' } = {}) {
    this.aqmpPath = aqmpPath;
  }

  public async connect(){
    if(this.connection && this.channel){
      return;
    }
    this.connection = await amqp.connect(this.aqmpPath);
    this.channel = await this.connection.createChannel();
  }

  public async close(){
    await this.channel?.close();
    await this.connection?.close();
    this.connection = undefined;
    this.channel = undefined;
  }

  public async sendMessage({message = "Hello World!", queue = 'task_queue'} = {}): Promise<boolean>{
    if(this.connection == undefined || this.channel == undefined){
      console.log('Please call connect first.')
      return false;
    }

    await this.channel.assertQueue(queue, {durable: true});
    const isSuccess = await this.channel.sendToQueue(queue, Buffer.from(message), {deliveryMode: true});
    console.log(" [x] Sent '%s'", message);
    return isSuccess
  }

  public async startWorking(doWork: (message:string)=>Promise<boolean>, queue = 'task_queue'): Promise<boolean>{
    if(this.connection == undefined || this.channel == undefined){
      console.log('Please call connect first.')
      return false;
    }

    await this.channel.assertQueue(queue, {durable: true});
    this.channel.prefetch(1);
    await this.channel.consume('task_queue', async (message)=>{
      if(message){
        const body = message.content.toString();
        const isDone = await doWork(body);
        if(isDone){
          this.channel?.ack(message);
        }
      }
    }, {noAck: false});

    console.log(" [*] Waiting for messages. To exit press CTRL+C");
    return true
  }
}

export default MessageQueue;
