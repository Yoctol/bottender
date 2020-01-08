export default async function App(context) {
  await context.sendText('Hello World');
  await context.sendText(`Received: ${context.event.text}`);
}
