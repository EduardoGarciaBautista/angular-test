export class ValueFakeService {

  constructor() {
  }

  getValue(): string {
    return 'fake value';
  }

  setValue(value: string) {
  }

  gerPromiseValue(): Promise<string> {
    return Promise.resolve('fake promise value');
  }
}
