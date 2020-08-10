export interface ITechnologyAppCount {
  name?: string;
  type?: string;
  count?: number;
}

export class TechnologyAppCount implements ITechnologyAppCount {
  constructor(public name?: string, public type?: string, public count?: number) {}
}
