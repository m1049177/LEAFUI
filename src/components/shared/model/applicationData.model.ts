export interface IApplicationData {
    status?: string;
    type?: string;
    data?: any;
  }
  
  export class ApplicationData implements IApplicationData {
    constructor(public status?: string, public type?: string, public data?: any) {}
  }
