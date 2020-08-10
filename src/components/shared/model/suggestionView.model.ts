import { IApplication } from './application.model';
import { ITechnologyStack } from './technology-stack.model';

export interface ISuggestionView {
  application?: IApplication[];
  description?: string[];
  suggestion?: string[];
  technology?: ITechnologyStack;
}

export class SuggestionView implements ISuggestionView {
  constructor(
    public application?: IApplication[],
    public description?: string[],
    public suggestion?: string[],
    public technology?: ITechnologyStack
  ) {}
}
