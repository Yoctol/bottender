export default async function App(context: any): Promise<void> {
  await context.send('Welcome to Bottender');
}
