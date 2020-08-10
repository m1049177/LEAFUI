export interface IApplicationSpendDetails {
    status?: string;
    spendDetails?: number[];
    spend_type?: string[];
  }
  
  export class ApplicationSpendDetails implements IApplicationSpendDetails {
    constructor(public status?: string, public spendDetails?: number[], public spend_type?: string[]) {}
  }

  export interface IApplicationTotalSpend {
    status?: string;
    total_spend?: string;
  }
  
  export class ApplicationTotalSpend implements IApplicationTotalSpend {
    constructor(public status?: string, public total_spend?: string) {}
  }
