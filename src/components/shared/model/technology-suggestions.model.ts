import { ITechnologyRecommendation } from './technology-recommendation.model';

export const enum Type {
  RISK = 'RISK',
  WARNING = 'WARNING',
  UPGRADATION = 'UPGRADATION'
}

export interface ITechnologySuggestions {
  id?: number;
  type?: Type;
  version?: string;
  description?: string;
  suggestion?: string;
  technologyRecommendation?: ITechnologyRecommendation;
}

export class TechnologySuggestions implements ITechnologySuggestions {
  constructor(
    public id?: number,
    public type?: Type,
    public version?: string,
    public description?: string,
    public suggestion?: string,
    public technologyRecommendation?: ITechnologyRecommendation
  ) {}
}
