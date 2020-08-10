// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import Vue from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './app.vue';
import router from './router';

import * as config from './components/shared/config/config';
import * as bootstrapVueConfig from './components/shared/config/config-bootstrap-vue';
import AuditsService from './components/admin/audits/audits.service';
import HealthService from './components/admin/health/health.service';
import MetricsService from './components/admin/metrics/metrics.service';
import LogsService from './components/admin/logs/logs.service';
import ActivateService from './components/account/activate/activate.service';
import RegisterService from './components/account/register/register.service';
import UserManagementService from './components/admin/user-management/user-management.service';

import LoginService from './components/account/login.service';
import AccountService from './components/account/account.service';

import './assets/scss/vendor.scss';
import AlertService from './components/shared/alert/alert.service';
import ConfigurationService from './components/admin/configuration/configuration.service';

import OraganizationalUnitService from './components/entities/oraganizational-unit/oraganizational-unit.service';
import LineOfBusinessService from './components/entities/line-of-business/line-of-business.service';
import ApplicationService from './components/entities/application/application.service';
import IssueService from './components/entities/issue/issue.service';
import FunctionalityService from './components/entities/functionality/functionality.service';
import MaintenanceService from './components/entities/maintenance/maintenance.service';
import ReportService from './components/entities/report/report.service';
import IntegrationService from './components/entities/integration/integration.service';
import RevenueService from './components/entities/revenue/revenue.service';
import SpendService from './components/entities/spend/spend.service';
import ChangeService from './components/entities/change/change.service';
import TechnologyService from './components/entities/technology/technology.service';
import BrandService from './components/entities/brand/brand.service';
import BusinessFunctionService from './components/entities/business-function/business-function.service';
import CapabilitiesService from './components/entities/capabilities/capabilities.service';
import BusinessProcessService from './components/entities/business-process/business-process.service';
import ActivityService from './components/entities/activity/activity.service';
import TaskService from './components/entities/task/task.service';
import EmployeeService from './components/entities/employee/employee.service';
import TechnologyStackService from './components/entities/technology-stack/technology-stack.service';
import TechnologyRecommendationService from './components/entities/technology-recommendation/technology-recommendation.service';
import CompanyService from './components/entities/company/company.service';
import ExcelTemplateService from './components/entities/excel-template/excel-template.service';
import UploadExcelService from './components/entities/upload-excel/upload-excel.service';
import ExampleService from './components/entities/example/example.service';
import ExpenditureService from './components/entities/expenditure/expenditure.service';
import EvaluationService from './components/entities/evaluation/evaluation.service';
// filtering data service
import FilterService from './components/shared/service/filter.service';
import AssessmentService from './components/entities/assessment/assessment.service';
import TechnologySuggestionsService from './components/entities/technology-suggestions/technology-suggestions.service';
import BudgetService from './components/entities/budget/budget.service';
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import LabelService from './components/entities/label/label.service';
import DiagramService from './components/entities/diagram/diagram.service';
import { DiagramPlugin } from '@syncfusion/ej2-vue-diagrams';

Vue.use(DiagramPlugin);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
config.initVueApp(Vue);
config.initFortAwesome(Vue);
bootstrapVueConfig.initBootstrapVue(Vue);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const store = config.initVueXStore(Vue);

const alertService = new AlertService(store);
const loginService = new LoginService();
const accountService = new AccountService(store, router);

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next('/not-found');
  }

  if (to.meta && to.meta.authorities && to.meta.authorities.length > 0) {
    if (!accountService.hasAnyAuthority(to.meta.authorities)) {
      sessionStorage.setItem('requested-url', to.fullPath);
      next('/forbidden');
    } else {
      next();
    }
  } else {
    // no authorities, so just proceed
    next();
  }
});
export const bus = new Vue();
/* tslint:disable */
new Vue({
  el: '#app',
  render: h => h(App),
  components: { App },
  template: '<App/>',
  router,
  provide: {
    loginService: () => loginService,
    activateService: () => new ActivateService(),
    registerService: () => new RegisterService(),
    userService: () => new UserManagementService(),

    auditsService: () => new AuditsService(),
    healthService: () => new HealthService(),

    configurationService: () => new ConfigurationService(),
    logsService: () => new LogsService(),
    metricsService: () => new MetricsService(),
    alertService: () => alertService,
    oraganizationalUnitService: () => new OraganizationalUnitService(),
    lineOfBusinessService: () => new LineOfBusinessService(),
    applicationService: () => new ApplicationService(),
    issueService: () => new IssueService(),
    functionalityService: () => new FunctionalityService(),
    maintenanceService: () => new MaintenanceService(),
    reportService: () => new ReportService(),
    integrationService: () => new IntegrationService(),
    revenueService: () => new RevenueService(),
    spendService: () => new SpendService(),
    changeService: () => new ChangeService(),
    technologyService: () => new TechnologyService(),
    brandService: () => new BrandService(),
    businessFunctionService: () => new BusinessFunctionService(),
    capabilitiesService: () => new CapabilitiesService(),
    businessProcessService: () => new BusinessProcessService(),
    activityService: () => new ActivityService(),
    taskService: () => new TaskService(),
    employeeService: () => new EmployeeService(),
    technologyStackService: () => new TechnologyStackService(),
    technologyRecommendationService: () => new TechnologyRecommendationService(),
    companyService: () => new CompanyService(),
    excelTemplateService: () => new ExcelTemplateService(),
    uploadExcelService: () => new UploadExcelService(),
    exampleService: () => new ExampleService(),
    expenditureService: () => new ExpenditureService(),
    evaluationService: () => new EvaluationService(),
    assessmentService: () => new AssessmentService(),
    technologySuggestionsService: () => new TechnologySuggestionsService(),
    budgetService: () => new BudgetService(),
    // jhipster-needle-add-entity-service-to-main - JHipster will import entities services here
    accountService: () => accountService,
    filterService: () => new FilterService(),
    labelService: () => new LabelService(),
    diagramService: () => new DiagramService()
  },
  store
}).$mount('#app')
