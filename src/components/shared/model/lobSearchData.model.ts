import { IBusinessFunction } from './business-function.model';
import { IBusinessProcess } from './business-process.model';
import { ICapabilities } from './capabilities.model';
import { IActivity } from './activity.model';
import { ITask } from './task.model';

export interface ILobSearchData {
  id?: number;
  name?: string;
  bFunction?: IBusinessFunction[];
  capability?: ICapabilities[];
  bProcesses?: IBusinessProcess[];
  activities?: IActivity[];
  tasks?: ITask[];
}

export class LobSearchData implements ILobSearchData {
  constructor(
    public id?: number,
    public name?: string,
    public bFunction?: IBusinessFunction[],
    public capability?: ICapabilities[],
    public bProcesses?: IBusinessProcess[],
    public activities?: IActivity[],
    public tasks?: ITask[]
  ) {}
}
