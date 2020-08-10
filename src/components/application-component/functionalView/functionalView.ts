import { Inject, Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
import LineOfBusinessService from '../../entities/line-of-business/line-of-business.service';
import { ILineOfBusiness } from '../../shared/model/line-of-business.model';
import BusinessFunctionService from '../../entities/business-function/business-function.service';
import { IBusinessFunction } from '../../shared/model/business-function.model';
import { ICapabilities } from '../../shared/model/capabilities.model';
import CapabilitiesService from '../../entities/capabilities/capabilities.service';
import OraganizationalUnitService from '../../entities/oraganizational-unit/oraganizational-unit.service';
import { IOraganizationalUnit } from '../../shared/model/oraganizational-unit.model';
import BusinessProcessService from '../../entities/business-process/business-process.service';
import ActivityService from '../../entities/activity/activity.service';
import TaskService from '../../entities/task/task.service';
import VueApexCharts from 'vue-apexcharts';
import orgChart from '../chart/orgChart.vue';
import { bus } from '../../../main';
import FilterService from '../../shared/service/filter.service';
import { IBusinessProcess } from '../../shared/model/business-process.model';
import { IActivity } from '../../shared/model/activity.model';
import { ITask } from '../../shared/model/task.model';

@Component({
  components: {
    apexchart: Vue.extend(VueApexCharts),
    orgChart
  }
})
export default class FunctionalView extends Vue {
  @Inject('lineOfBusinessService') private lineOfBusinessService!: () => LineOfBusinessService;
  @Inject('businessFunctionService') private businessFunctionService!: () => BusinessFunctionService;
  @Inject('capabilitiesService') private capabilitiesService!: () => CapabilitiesService;
  @Inject('oraganizationalUnitService') private oraganizationalUnitService!: () => OraganizationalUnitService;
  @Inject('businessProcessService') private businessProcessService!: () => BusinessProcessService;
  @Inject('activityService') private activityService!: () => ActivityService;
  @Inject('taskService') private taskService!: () => TaskService;
  @Inject('filterService') private filterService!: () => FilterService;

  public company_id: number = 0;
  public lineOfBusinesses: ILineOfBusiness[] = [];
  public businessFunctions: IBusinessFunction[] = [];
  public businessCapabilities: ICapabilities[] = [];
  public organizationalUnits: IOraganizationalUnit[] = [];
  public businessProcess: IBusinessProcess[] = [];
  public activity: IActivity[] = [];
  public task: ITask[] = [];
  public capabilityDetails: any[] = [];
  public capability: any[] = [];
  public data: any[] = [];
  public lobBusinessFunctions: any[] = [];
  public organizationalUnitsCount = 0;
  public businessFunctionsCount = 0;
  public capabilitiesCount = 0;
  public processesCount = 0;
  public activitiesCount = 0;
  public tasksCount = 0;
  public dropdown = false;
  public busStatus = false;
  public selectedCategory = '';
  public dropDownData = ['OraganizationalUnit', 'LineOfBusiness', 'BusinessFunction', 'Capabilities'];
  $refs!: {
    displayCapability: HTMLFormElement
  }

  public created() {
    this.busStatus = false;
    bus.$on('CompanyChange', (obj: any) => {
      if(parseInt(obj)!== this.company_id) {
        this.company_id = parseInt(obj);
        this.busStatus = true;
      this.retrieveAllDetails();
      this.retrieveCapabilities();
      }
    });
    if (this.company_id === 0 && this.busStatus === false) {
      this.company_id = parseInt(localStorage.getItem('CompanyId')!);
      this.retrieveAllDetails();
      this.retrieveCapabilities();
    }
  }
  public mounted(): void {}
  public retrieveAllDetails() {
    this.data = [];
    this.lineOfBusinesses = [];
    this.businessFunctions = [];
    this.task = [];
    this.activity = [];
    this.businessProcess = [];
    this.businessCapabilities = [];
    this.organizationalUnits = [];
    this.lineOfBusinessService()
      .retrieve()
      .then(res => {
        this.lineOfBusinesses = res.data;
        if (this.lineOfBusinesses.length!== 0) {
          this.filterService()
            .LineOfBusinessFilter(this.lineOfBusinesses, this.company_id)
            .then(response => {
              this.lineOfBusinesses = response;
            });
        }
        this.businessFunctionService()
          .retrieve()
          .then(response => {
            this.businessFunctions = response.data;
            if (this.businessFunctions.length!== 0) {
              this.filterService()
                .BusinessFunctionFilter(this.businessFunctions, this.company_id)
                .then(response1 => {
                  this.businessFunctions = response1;
                  this.businessFunctionsCount = response1.length;
                });
            }
            this.lineOfBusinesses.forEach(lineOfBusiness => {
              this.lobBusinessFunctions = [];
              this.businessFunctions.forEach(businessFunction => {
                if (businessFunction?.lineOfBusiness?.id === lineOfBusiness.id) {
                  this.lobBusinessFunctions.push(businessFunction);
                }
              });
              this.data.push({ lob: lineOfBusiness, businessFunction: this.lobBusinessFunctions });
            });
          });
        console.log(this.data);
      });
    this.oraganizationalUnitService()
      .retrieve()
      .then(response1 => {
        this.organizationalUnits = response1.data;
        if (this.organizationalUnits.length!== 0) {
          this.filterService()
            .OrganizationalFilter(this.organizationalUnits, this.company_id)
            .then(res => {
              this.organizationalUnits = res;
              this.organizationalUnitsCount = res.length;
            });
        }
      }).catch(function(error) { console.log(error); })
  }

  public retrieveCapabilities() {
    this.capabilitiesService()
      .retrieve()
      .then(res => {
        this.businessCapabilities = res.data;
        if (this.businessCapabilities.length !== 0) {
          this.filterService()
            .CapabilitiesFilter(this.businessCapabilities, this.company_id)
            .then(response => {
              this.businessCapabilities = response;
              this.capabilitiesCount = response.length;
            });
        }
      }).catch(function(error) { console.log(error); })

    this.businessProcessService()
      .retrieve()
      .then(process => {
        this.businessProcess = process.data;
        if (this.businessProcess.length!== 0) {
          this.filterService()
            .BusinessProcessFilter(this.businessProcess, this.company_id)
            .then(res => {
              this.businessProcess = res;
              this.processesCount = res.length;
            });
        }
      }).catch(function(error) { console.log(error); })

    this.activityService()
      .retrieve()
      .then(data => {
        this.activity = data.data;
        if (this.activity.length!== 0) {
          this.filterService()
            .ActivityFilter(this.activity, this.company_id)
            .then(res => {
              this.activity = res;
              this.activitiesCount = res.length;
            });
        }
      }).catch(function(error) { console.log(error); })

    this.taskService()
      .retrieve()
      .then(taskData => {
        this.task = taskData.data;
        if (this.task.length!== 0) {
          this.filterService()
            .TaskFilter(this.task, this.company_id)
            .then(res => {
              this.task = res;
              this.tasksCount = res.length;
            });
        }
      }).catch(function(error) { console.log(error); })
  }

  public closeDialog(): void {
    (this.$refs.displayCapability).hide();
  }

  public add() {
    this.dropdown = true;
    this.$router.push({ name: this.selectedCategory + 'Create' });
  }

  public changeInDropdown() {
    console.log(this.selectedCategory);
  }
  public navigateFunction(select: string) {
    this.$router.push({ name: select });
  }
}
