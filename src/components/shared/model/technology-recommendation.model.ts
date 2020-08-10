export const enum TechnologyType {
  CLIENT = 'CLIENT',
  SERVER = 'SERVER',
  CLOUD = 'CLOUD',
  DATABASE = 'DATABASE',
  STORAGE = 'STORAGE',
  MIDDLEWARE = 'MIDDLEWARE'
}

export interface ITechnologyRecommendation {
  id?: number;
  technologyName?: string;
  outdatedVersion?: string;
  stableVersion?: string;
  latestVersion?: string;
  newFeatures?: string;
  technologyType?: string;
}

export class TechnologyRecommendation implements ITechnologyRecommendation {
  constructor(
    public id?: number,
    public technologyName?: string,
    public outdatedVersion?: string,
    public stableVersion?: string,
    public latestVersion?: string,
    public newFeatures?: string,
    public technologyType?: string
  ) {}
}
