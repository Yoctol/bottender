export type TestClient = {
  calls: Array<{
    name: string,
    args: Array<any>,
  }>,
  callMethod(name: string, args: Array<any>): void,
  mockReset(): void,
};
