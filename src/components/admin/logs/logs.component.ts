import { Component, Vue, Inject } from 'vue-property-decorator';

import LogsService from './logs.service';

@Component
export default class JhiLogs extends Vue {
  @Inject('logsService') private logsService!: () => LogsService;
  private loggers: any[] = [];
  public filtered = '';
  public orderProp = 'name';
  public reverse = false;

  public mounted(): void {
    this.init();
  }

  public init(): void {
    this.logsService()
      .findAll()
      .then(response => {
        this.extractLoggers(response);
      });
  }

  public updateLevel(name: string, level: string): void {
    this.logsService()
      .changeLevel(name, level)
      .then(() => {
        this.init();
      }).catch(error => { console.error(error) });
      
  }

  public changeOrder(orderProp: string): void {
    this.orderProp = orderProp;
    this.reverse = !this.reverse;
  }

  private extractLoggers(response: any) {
    this.loggers = [];
    if (response.data) {
      for (const key of Object.keys(response.data.loggers)) {
        const logger = response.data.loggers[key];
        this.loggers.push({ name: key, level: logger.effectiveLevel });
      }
    }
  }
}
