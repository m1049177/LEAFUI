export interface IChartData {
id?: number;
name?: string;
title?: string;
children?: IChartData[];
}

export class ChartData implements IChartData {
  constructor(public id?: number,public name?: string, public title?: string, public children?: IChartData[]) {}
}
