import { IApplication } from './application.model';

export const enum IntegrationFlowType {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
  BIDIRECTIONAL = 'BIDIRECTIONAL'
}

export interface IIntegration {
  id?: number;
  flowType?: IntegrationFlowType;
  entity?: string;
  application?: IApplication;
  integrationApp?: IApplication;
}

export class Integration implements IIntegration {
  constructor(
    public id?: number,
    public flowType?: IntegrationFlowType,
    public entity?: string,
    public application?: IApplication,
    public integrationApp?: IApplication
  ) {}
}
