export interface IExample {
  id?: number;
  name?: string;
}

export class Example implements IExample {
  constructor(public id?: number, public name?: string) {}
}
