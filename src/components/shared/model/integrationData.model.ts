import { IntegrationFlowType } from './integration.model';

export interface IIntegrationData {
    mainAppId?: number;
    mainAppName?: string;
    links?: Links[];
}
export class IntegrationData implements IIntegrationData {
    constructor(
      public mainAppId?: number,
      public mainAppName?: string,
      public links?: Links[]
    ) {}
}
export class Links {
    public appId?: number;
    public appName?: string;
    public entity?: string;
    public flowType?: IntegrationFlowType
}
