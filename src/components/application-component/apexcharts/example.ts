import { Component, Inject, Vue } from 'vue-property-decorator';
import VueApexCharts from 'vue-apexcharts';
@Component({
  components: {
    apexchart: VueApexCharts
  }
})
export default class Example extends Vue {
  chartOptions: any;
  series: any;
  showCharts = false;
  colors: string[] = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];
  public mounted(): void {
    this.function1();
  }
  function1(): void {
    this.series = [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }
    ];
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click(chart: any, w: any, e: any) {
            console.log(chart, w, e);
          }
        }
      },
      colors: this.colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['A', 'B', 'C', 'D', 'C', 'E', 'F', 'G'],
        labels: {
          style: {
            colors: this.colors,
            fontSize: '14px'
          }
        }
      }
    };
    this.showCharts = true;
  }
}
