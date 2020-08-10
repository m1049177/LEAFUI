export interface ISuggestion {
  type?: string;
  risk?: number;
  stable?: number;
}

export class Suggestion implements ISuggestion {
  constructor(public type?: string, public risk?: number, public stable?: number) {}
}
