export default async function App(context: any): Promise<void> {
  await context.sendText('Welcome to Bottender');
}
