export type TestClient = {
  calls: Array<{
    name: string;
    args: any[];
  }>;
  callMethod(name: string, args: any[]): void;
  mockReset(): void;
};
