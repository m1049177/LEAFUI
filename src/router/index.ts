import Vue from 'vue';
import Component from 'vue-class-component';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);
import Router from 'vue-router';

const Home = () => import('../components/core/home/home.vue');
const Error = () => import('../components/core/error/error.vue');
const Register = () => import('../components/account/register/register.vue');
const Activate = () => import('../components/account/activate/activate.vue');
const ResetPasswordInit = () => import('../components/account/reset-password/init/reset-password-init.vue');
const ResetPasswordFinish = () => import('../components/account/reset-password/finish/reset-password-finish.vue');
const ChangePassword = () => import('../components/account/change-password/change-password.vue');
const Settings = () => import('../components/account/settings/settings.vue');
const JhiUserManagementComponent = () => import('../components/admin/user-management/user-management.vue');
const JhiUserManagementViewComponent = () => import('../components/admin/user-management/user-management-view.vue');
const JhiUserManagementEditComponent = () => import('../components/admin/user-management/user-management-edit.vue');
const JhiConfigurationComponent = () => import('../components/admin/configuration/configuration.vue');
const JhiDocsComponent = () => import('../components/admin/docs/docs.vue');
const JhiHealthComponent = () => import('../components/admin/health/health.vue');
const JhiLogsComponent = () => import('../components/admin/logs/logs.vue');
const JhiAuditsComponent = () => import('../components/admin/audits/audits.vue');
const JhiMetricsComponent = () => import('../components/admin/metrics/metrics.vue');
/* tslint:disable */
// prettier-ignore
const OraganizationalUnit = () => import('../components/entities/oraganizational-unit/oraganizational-unit.vue');
// prettier-ignore
const OraganizationalUnitUpdate = () => import('../components/entities/oraganizational-unit/oraganizational-unit-update.vue');
// prettier-ignore
const OraganizationalUnitDetails = () => import('../components/entities/oraganizational-unit/oraganizational-unit-details.vue');
// prettier-ignore
const LineOfBusiness = () => import('../components/entities/line-of-business/line-of-business.vue');
// prettier-ignore
const LineOfBusinessUpdate = () => import('../components/entities/line-of-business/line-of-business-update.vue');
// prettier-ignore
const LineOfBusinessDetails = () => import('../components/entities/line-of-business/line-of-business-details.vue');
// prettier-ignore
const Application = () => import('../components/entities/application/application.vue');
// prettier-ignore
const ApplicationUpdate = () => import('../components/entities/application/application-update.vue');
// prettier-ignore
const ApplicationDetails = () => import('../components/entities/application/application-details.vue');
// prettier-ignore
const Issue = () => import('../components/entities/issue/issue.vue');
// prettier-ignore
const IssueUpdate = () => import('../components/entities/issue/issue-update.vue');
// prettier-ignore
const IssueDetails = () => import('../components/entities/issue/issue-details.vue');
// prettier-ignore
const Functionality = () => import('../components/entities/functionality/functionality.vue');
// prettier-ignore
const FunctionalityUpdate = () => import('../components/entities/functionality/functionality-update.vue');
// prettier-ignore
const FunctionalityDetails = () => import('../components/entities/functionality/functionality-details.vue');
// prettier-ignore
const Maintenance = () => import('../components/entities/maintenance/maintenance.vue');
// prettier-ignore
const MaintenanceUpdate = () => import('../components/entities/maintenance/maintenance-update.vue');
// prettier-ignore
const MaintenanceDetails = () => import('../components/entities/maintenance/maintenance-details.vue');
// prettier-ignore
const Report = () => import('../components/entities/report/report.vue');
// prettier-ignore
const ReportUpdate = () => import('../components/entities/report/report-update.vue');
// prettier-ignore
const ReportDetails = () => import('../components/entities/report/report-details.vue');
// prettier-ignore
const Integration = () => import('../components//entities/integration/integration.vue');
// prettier-ignore
const IntegrationUpdate = () => import('../components//entities/integration/integration-update.vue');
// prettier-ignore
const IntegrationDetails = () => import('../components//entities/integration/integration-details.vue');
// prettier-ignore
const Revenue = () => import('../components//entities/revenue/revenue.vue');
// prettier-ignore
const RevenueUpdate = () => import('../components//entities/revenue/revenue-update.vue');
// prettier-ignore
const RevenueDetails = () => import('../components//entities/revenue/revenue-details.vue');
// prettier-ignore/
const Change = () => import('../components//entities/change/change.vue');
// prettier-ignore
const ChangeUpdate = () => import('../components//entities/change/change-update.vue');
// prettier-ignore
const ChangeDetails = () => import('../components//entities/change/change-details.vue');
// prettier-ignore
const Technology = () => import('../components//entities/technology/technology.vue');
// prettier-ignore
const TechnologyUpdate = () => import('../components//entities/technology/technology-update.vue');
// prettier-ignore
const TechnologyDetails = () => import('../components//entities/technology/technology-details.vue');
// prettier-ignore
const Brand = () => import('../components//entities/brand/brand.vue');
// prettier-ignore
const BrandUpdate = () => import('../components//entities/brand/brand-update.vue');
// prettier-ignore
const BrandDetails = () => import('../components//entities/brand/brand-details.vue');
// prettier-ignore
const BusinessFunction = () => import('../components//entities/business-function/business-function.vue');
// prettier-ignore
const BusinessFunctionUpdate = () => import('../components//entities/business-function/business-function-update.vue');
// prettier-ignore
const BusinessFunctionDetails = () => import('../components//entities/business-function/business-function-details.vue');
// prettier-ignore
const Capabilities = () => import('../components//entities/capabilities/capabilities.vue');
// prettier-ignore
const CapabilitiesUpdate = () => import('../components//entities/capabilities/capabilities-update.vue');
// prettier-ignore
const CapabilitiesDetails = () => import('../components//entities/capabilities/capabilities-details.vue');
// prettier-ignore
const BusinessProcess = () => import('../components//entities/business-process/business-process.vue');
// prettier-ignore
const BusinessProcessUpdate = () => import('../components//entities/business-process/business-process-update.vue');
// prettier-ignore
const BusinessProcessDetails = () => import('../components//entities/business-process/business-process-details.vue');
// prettier-ignore
const Activity = () => import('../components//entities/activity/activity.vue');
// prettier-ignore
const ActivityUpdate = () => import('../components//entities/activity/activity-update.vue');
// prettier-ignore
const ActivityDetails = () => import('../components//entities/activity/activity-details.vue');
// prettier-ignore
const Task = () => import('../components//entities/task/task.vue');
// prettier-ignore
const TaskUpdate = () => import('../components//entities/task/task-update.vue');
// prettier-ignore
const TaskDetails = () => import('../components//entities/task/task-details.vue');
// prettier-ignore
const Employee = () => import('../components//entities/employee/employee.vue');
// prettier-ignore
const EmployeeUpdate = () => import('../components//entities/employee/employee-update.vue');
// prettier-ignore
const EmployeeDetails = () => import('../components//entities/employee/employee-details.vue');
// prettier-ignore
const TechnologyStack = () => import('../components//entities/technology-stack/technology-stack.vue');
// prettier-ignore
const TechnologyStackUpdate = () => import('../components//entities/technology-stack/technology-stack-update.vue');
// prettier-ignore
const TechnologyStackDetails = () => import('../components//entities/technology-stack/technology-stack-details.vue');
// prettier-ignore
const TechnologyRecommendation = () => import('../components//entities/technology-recommendation/technology-recommendation.vue');
// prettier-ignore
const TechnologyRecommendationUpdate = () => import('../components//entities/technology-recommendation/technology-recommendation-update.vue');
// prettier-ignore
const TechnologyRecommendationDetails = () => import('../components//entities/technology-recommendation/technology-recommendation-details.vue');
// prettier-ignore
const Company = () => import('../components//entities/company/company.vue');
// prettier-ignore
const CompanyUpdate = () => import('../components//entities/company/company-update.vue');
// prettier-ignore
const CompanyDetails = () => import('../components//entities/company/company-details.vue');
// prettier-ignore
const ExcelTemplate = () => import('../components//entities/excel-template/excel-template.vue');
// prettier-ignore
const ExcelTemplateUpdate = () => import('../components//entities/excel-template/excel-template-update.vue');
// prettier-ignore
const ExcelTemplateDetails = () => import('../components//entities/excel-template/excel-template-details.vue');
// prettier-ignore
const UploadExcel = () => import('../components//entities/upload-excel/upload-excel.vue');
// prettier-ignore
const UploadExcelUpdate = () => import('../components//entities/upload-excel/upload-excel-update.vue');
// prettier-ignore
const UploadExcelDetails = () => import('../components//entities/upload-excel/upload-excel-details.vue');
// prettier-ignore
const Spend = () => import('../components//entities/spend/spend.vue');
// prettier-ignore
const SpendUpdate = () => import('../components//entities/spend/spend-update.vue');
// prettier-ignore
const SpendDetails = () => import('../components//entities/spend/spend-details.vue');
// prettier-ignore
const Example = () => import('../components//entities/example/example.vue');
// prettier-ignore
const ExampleUpdate = () => import('../components//entities/example/example-update.vue');
// prettier-ignore
const ExampleDetails = () => import('../components//entities/example/example-details.vue');
// prettier-ignore
const Expenditure = () => import('../components//entities/expenditure/expenditure.vue');
// prettier-ignore
const ExpenditureUpdate = () => import('../components//entities/expenditure/expenditure-update.vue');
// prettier-ignore
const ExpenditureDetails = () => import('../components//entities/expenditure/expenditure-details.vue');
// prettier-ignore
const Evaluation = () => import('../components//entities/evaluation/evaluation.vue');
// prettier-ignore
const EvaluationUpdate = () => import('../components//entities/evaluation/evaluation-update.vue');
// prettier-ignore
const EvaluationDetails = () => import('../components//entities/evaluation/evaluation-details.vue');

const EvaluationReport = () => import('../components//entities/evaluation/evaluation.report.vue');
// prettier-ignore
const Assessment = () => import('../components//entities/assessment/assessment.vue');
// prettier-ignore
const AssessmentUpdate = () => import('../components//entities/assessment/assessment-update.vue');
// prettier-ignore
const AssessmentDetails = () => import('../components//entities/assessment/assessment-details.vue');
// prettier-ignore
const TechnologySuggestions = () => import('../components//entities/technology-suggestions/technology-suggestions.vue');
// prettier-ignore
const TechnologySuggestionsUpdate = () => import('../components//entities/technology-suggestions/technology-suggestions-update.vue');
// prettier-ignore
const TechnologySuggestionsDetails = () => import('../components//entities/technology-suggestions/technology-suggestions-details.vue');
// prettier-ignore
const Budget = () => import('../components//entities/budget/budget.vue');
// prettier-ignore
const BudgetUpdate = () => import('../components//entities/budget/budget-update.vue');
// prettier-ignore
const BudgetDetails = () => import('../components//entities/budget/budget-details.vue');

const Label = () => import('../components//entities/label/label.vue');
// prettier-ignore
const LabelUpdate = () => import('../components//entities/label/label-update.vue');
// prettier-ignore
const LabelDetails = () => import('../components//entities/label/label-details.vue');

// prettier-ignore
const Diagram = () => import('../components//entities/diagram/diagram.vue');
// prettier-ignore
const DiagramUpdate = () => import('../components//entities/diagram/diagram-update.vue');
// prettier-ignore
const DiagramDetails = () => import('../components//entities/diagram/diagram-details.vue');

const DrawToolGoJS = () => import('../components//application-component/drawtool-GoJS/drawtoolGoJS.vue');

const AppPortfolio = () => import('../components//application-component/app-portfolio/app-portfolio.vue');

const LobPortfolio = () => import('../components//application-component/lob-portfolio/lob-portfolio.vue');

const TechnicalView = () => import('../components//application-component/technicalView/technicalview.vue');

const Suggestion = () => import('../components//application-component/technicalView/suggestion.vue');

const FunctionalView = () => import('../components//application-component/functionalView/functionalView.vue');

const UploadDataSheet = () => import('../components//application-component/app-portfolio/UploadExcel.vue');

const AddBucket = () => import('../components//application-component/add-component/add-bucket.vue');

const Search = () => import('../components//core/search/search.vue');

const SearchDetail = () => import('../components//core/search/search-detail.vue');

const IntegrationApp = () => import('../components/application-component/app-portfolio/integration-app.vue');

Vue.use(Router);

// prettier-ignore
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/drawtoolGoJS',
      name: 'DrawToolGoJS',
      component: DrawToolGoJS
    },
    {
      path: '/appPortfolio',
      name: 'AppPortfolio',
      component: AppPortfolio

    },
    {
      path: '/lobPortfolio/:appStatus',
      name: 'LobPortfolio',
      component: LobPortfolio,
      props: true
    },
    {
      path: '/functionalView',
      name: 'FunctionalView',
      component: FunctionalView
    },
    {
      path: '/forbidden',
      name: 'Forbidden',
      component: Error,
      meta: { error403: true }
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: Error,
      meta: { error404: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/activate',
      name: 'Activate',
      component: Activate
    },
    {
      path: '/reset/request',
      name: 'ResetPasswordInit',
      component: ResetPasswordInit
    },
    {
      path: '/reset/finish',
      name: 'ResetPasswordFinish',
      component: ResetPasswordFinish
    },
    {
      path: '/account/password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/account/settings',
      name: 'Settings',
      component: Settings,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/admin/user-management',
      name: 'JhiUser',
      component: JhiUserManagementComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/new',
      name: 'JhiUserCreate',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/edit',
      name: 'JhiUserEdit',
      component: JhiUserManagementEditComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/user-management/:userId/view',
      name: 'JhiUserView',
      component: JhiUserManagementViewComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/docs',
      name: 'JhiDocsComponent',
      component: JhiDocsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/audits',
      name: 'JhiAuditsComponent',
      component: JhiAuditsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-health',
      name: 'JhiHealthComponent',
      component: JhiHealthComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/logs',
      name: 'JhiLogsComponent',
      component: JhiLogsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-metrics',
      name: 'JhiMetricsComponent',
      component: JhiMetricsComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/admin/jhi-configuration',
      name: 'JhiConfigurationComponent',
      component: JhiConfigurationComponent,
      meta: { authorities: ['ROLE_ADMIN'] }
    },
    {
      path: '/techview',
      name: 'TechnicalView',
      component: TechnicalView
    },
    {
      path: '/techview/suggestion',
      name: 'Suggestion',
      component: Suggestion,
      props: true
    },
    {
      path: '/entity/oraganizational-unit',
      name: 'OraganizationalUnit',
      component: OraganizationalUnit,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/oraganizational-unit/new',
      name: 'OraganizationalUnitCreate',
      component: OraganizationalUnitUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/oraganizational-unit/:oraganizationalUnitId/edit',
      name: 'OraganizationalUnitEdit',
      component: OraganizationalUnitUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/oraganizational-unit/:oraganizationalUnitId/view',
      name: 'OraganizationalUnitView',
      component: OraganizationalUnitDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/line-of-business',
      name: 'LineOfBusiness',
      component: LineOfBusiness,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/line-of-business/new',
      name: 'LineOfBusinessCreate',
      component: LineOfBusinessUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/line-of-business/:lineOfBusinessId/edit',
      name: 'LineOfBusinessEdit',
      component: LineOfBusinessUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/line-of-business/:lineOfBusinessId/view',
      name: 'LineOfBusinessView',
      component: LineOfBusinessDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/application',
      name: 'Application',
      component: Application,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/application/new',
      name: 'ApplicationCreate',
      component: ApplicationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/application/:applicationId/edit',
      name: 'ApplicationEdit',
      component: ApplicationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/application/:applicationId/view',
      name: 'ApplicationView',
      component: ApplicationDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/issue',
      name: 'Issue',
      component: Issue,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/issue/new',
      name: 'IssueCreate',
      component: IssueUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/issue/:issueId/edit',
      name: 'IssueEdit',
      component: IssueUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/issue/:issueId/view',
      name: 'IssueView',
      component: IssueDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/functionality',
      name: 'Functionality',
      component: Functionality,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/functionality/new',
      name: 'FunctionalityCreate',
      component: FunctionalityUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/functionality/:functionalityId/edit',
      name: 'FunctionalityEdit',
      component: FunctionalityUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/functionality/:functionalityId/view',
      name: 'FunctionalityView',
      component: FunctionalityDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/maintenance',
      name: 'Maintenance',
      component: Maintenance,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/maintenance/new',
      name: 'MaintenanceCreate',
      component: MaintenanceUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/maintenance/:maintenanceId/edit',
      name: 'MaintenanceEdit',
      component: MaintenanceUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/maintenance/:maintenanceId/view',
      name: 'MaintenanceView',
      component: MaintenanceDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/report',
      name: 'Report',
      component: Report,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/report/new',
      name: 'ReportCreate',
      component: ReportUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/report/:reportId/edit',
      name: 'ReportEdit',
      component: ReportUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/report/:reportId/view',
      name: 'ReportView',
      component: ReportDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/integration',
      name: 'Integration',
      component: Integration,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/integration/new',
      name: 'IntegrationCreate',
      component: IntegrationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/integration/:integrationId/edit',
      name: 'IntegrationEdit',
      component: IntegrationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/integration/:integrationId/view',
      name: 'IntegrationView',
      component: IntegrationDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/revenue',
      name: 'Revenue',
      component: Revenue,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/revenue/new',
      name: 'RevenueCreate',
      component: RevenueUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/revenue/:revenueId/edit',
      name: 'RevenueEdit',
      component: RevenueUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/revenue/:revenueId/view',
      name: 'RevenueView',
      component: RevenueDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/spend',
      name: 'Spend',
      component: Spend,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/spend/new',
      name: 'SpendCreate',
      component: SpendUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/spend/:spendId/edit',
      name: 'SpendEdit',
      component: SpendUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/spend/:spendId/view',
      name: 'SpendView',
      component: SpendDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/change',
      name: 'Change',
      component: Change,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/change/new',
      name: 'ChangeCreate',
      component: ChangeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/change/:changeId/edit',
      name: 'ChangeEdit',
      component: ChangeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/change/:changeId/view',
      name: 'ChangeView',
      component: ChangeDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/technology',
      name: 'Technology',
      component: Technology,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology/new',
      name: 'TechnologyCreate',
      component: TechnologyUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology/:technologyId/edit',
      name: 'TechnologyEdit',
      component: TechnologyUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology/:technologyId/view',
      name: 'TechnologyView',
      component: TechnologyDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/brand',
      name: 'Brand',
      component: Brand,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/brand/new',
      name: 'BrandCreate',
      component: BrandUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/brand/:brandId/edit',
      name: 'BrandEdit',
      component: BrandUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/brand/:brandId/view',
      name: 'BrandView',
      component: BrandDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/business-function',
      name: 'BusinessFunction',
      component: BusinessFunction,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/business-function/new',
      name: 'BusinessFunctionCreate',
      component: BusinessFunctionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/business-function/:businessFunctionId/edit',
      name: 'BusinessFunctionEdit',
      component: BusinessFunctionUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/business-function/:businessFunctionId/view',
      name: 'BusinessFunctionView',
      component: BusinessFunctionDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/capabilities',
      name: 'Capabilities',
      component: Capabilities,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/capabilities/new',
      name: 'CapabilitiesCreate',
      component: CapabilitiesUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/capabilities/:capabilitiesId/edit',
      name: 'CapabilitiesEdit',
      component: CapabilitiesUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/capabilities/:capabilitiesId/view',
      name: 'CapabilitiesView',
      component: CapabilitiesDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/business-process',
      name: 'BusinessProcess',
      component: BusinessProcess,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/business-process/new',
      name: 'BusinessProcessCreate',
      component: BusinessProcessUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/business-process/:businessProcessId/edit',
      name: 'BusinessProcessEdit',
      component: BusinessProcessUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/business-process/:businessProcessId/view',
      name: 'BusinessProcessView',
      component: BusinessProcessDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/activity',
      name: 'Activity',
      component: Activity,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/activity/new',
      name: 'ActivityCreate',
      component: ActivityUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/activity/:activityId/edit',
      name: 'ActivityEdit',
      component: ActivityUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/activity/:activityId/view',
      name: 'ActivityView',
      component: ActivityDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/task',
      name: 'Task',
      component: Task,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/task/new',
      name: 'TaskCreate',
      component: TaskUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/task/:taskId/edit',
      name: 'TaskEdit',
      component: TaskUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/task/:taskId/view',
      name: 'TaskView',
      component: TaskDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/employee',
      name: 'Employee',
      component: Employee,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/employee/new',
      name: 'EmployeeCreate',
      component: EmployeeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/employee/:employeeId/edit',
      name: 'EmployeeEdit',
      component: EmployeeUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/employee/:employeeId/view',
      name: 'EmployeeView',
      component: EmployeeDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/technology-stack',
      name: 'TechnologyStack',
      component: TechnologyStack,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-stack/new',
      name: 'TechnologyStackCreate',
      component: TechnologyStackUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-stack/:technologyStackId/edit',
      name: 'TechnologyStackEdit',
      component: TechnologyStackUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-stack/:technologyStackId/view',
      name: 'TechnologyStackView',
      component: TechnologyStackDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/technology-recommendation',
      name: 'TechnologyRecommendation',
      component: TechnologyRecommendation,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-recommendation/new',
      name: 'TechnologyRecommendationCreate',
      component: TechnologyRecommendationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-recommendation/:technologyRecommendationId/edit',
      name: 'TechnologyRecommendationEdit',
      component: TechnologyRecommendationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-recommendation/:technologyRecommendationId/view',
      name: 'TechnologyRecommendationView',
      component: TechnologyRecommendationDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/company',
      name: 'Company',
      component: Company,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/company/new',
      name: 'CompanyCreate',
      component: CompanyUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/company/:companyId/edit',
      name: 'CompanyEdit',
      component: CompanyUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/company/:companyId/view',
      name: 'CompanyView',
      component: CompanyDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/excel-template',
      name: 'ExcelTemplate',
      component: ExcelTemplate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/excel-template/new',
      name: 'ExcelTemplateCreate',
      component: ExcelTemplateUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/excel-template/:excelTemplateId/edit',
      name: 'ExcelTemplateEdit',
      component: ExcelTemplateUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/excel-template/:excelTemplateId/view',
      name: 'ExcelTemplateView',
      component: ExcelTemplateDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/upload-excel',
      name: 'UploadExcel',
      component: UploadExcel,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/uploadDataSheet',
      name: 'UploadDataSheet',
      component: UploadDataSheet
    },
    {
      path: '/entity/upload-excel/new',
      name: 'UploadExcelCreate',
      component: UploadExcelUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/upload-excel/:uploadExcelId/edit',
      name: 'UploadExcelEdit',
      component: UploadExcelUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/upload-excel/:uploadExcelId/view',
      name: 'UploadExcelView',
      component: UploadExcelDetails,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/example',
      name: 'Example',
      component: Example,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/example/new',
      name: 'ExampleCreate',
      component: ExampleUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/example/:exampleId/edit',
      name: 'ExampleEdit',
      component: ExampleUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/example/:exampleId/view',
      name: 'ExampleView',
      component: ExampleDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/expenditure',
      name: 'Expenditure',
      component: Expenditure,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/expenditure/new',
      name: 'ExpenditureCreate',
      component: ExpenditureUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/expenditure/:expenditureId/edit',
      name: 'ExpenditureEdit',
      component: ExpenditureUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/expenditure/:expenditureId/view',
      name: 'ExpenditureView',
      component: ExpenditureDetails,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/evaluation',
      name: 'Evaluation',
      component: Evaluation,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/evaluation/new',
      name: 'EvaluationCreate',
      component: EvaluationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/evaluation/:evaluationId/edit',
      name: 'EvaluationEdit',
      component: EvaluationUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/evaluation/:evaluationId/view',
      name: 'EvaluationView',
      component: EvaluationDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/assessment',
      name: 'Assessment',
      component: Assessment,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/assessment/new',
      name: 'AssessmentCreate',
      component: AssessmentUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/assessment/:assessmentId/edit',
      name: 'AssessmentEdit',
      component: AssessmentUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/assessment/:assessmentId/view',
      name: 'AssessmentView',
      component: AssessmentDetails,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/evaluation/report',
      name: 'EvaluationReport',
      component: EvaluationReport,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/technology-suggestions',
      name: 'TechnologySuggestions',
      component: TechnologySuggestions,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-suggestions/new',
      name: 'TechnologySuggestionsCreate',
      component: TechnologySuggestionsUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-suggestions/:technologySuggestionsId/edit',
      name: 'TechnologySuggestionsEdit',
      component: TechnologySuggestionsUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/technology-suggestions/:technologySuggestionsId/view',
      name: 'TechnologySuggestionsView',
      component: TechnologySuggestionsDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/budget',
      name: 'Budget',
      component: Budget,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/budget/new',
      name: 'BudgetCreate',
      component: BudgetUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/budget/:budgetId/edit',
      name: 'BudgetEdit',
      component: BudgetUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/budget/:budgetId/view',
      name: 'BudgetView',
      component: BudgetDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    ,
    {
      path: '/entity/label',
      name: 'Label',
      component: Label,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/label/new',
      name: 'LabelCreate',
      component: LabelUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/label/:labelId/edit',
      name: 'LabelEdit',
      component: LabelUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/label/:labelId/view',
      name: 'LabelView',
      component: LabelDetails,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/add-bucket',
      name: 'AddBucket',
      component: AddBucket,
      props: true,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      props: true,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/search-detail',
      name: 'SearchDetail',
      component: SearchDetail,
      props: true,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/integration-app',
      name: 'IntegrationApp',
      component: IntegrationApp,
      props: true,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/diagram',
      name: 'Diagram',
      component: Diagram,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/diagram/new',
      name: 'DiagramCreate',
      component: DiagramUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/diagram/:diagramId/edit',
      name: 'DiagramEdit',
      component: DiagramUpdate,
      meta: { authorities: ['ROLE_USER'] }
    },
    {
      path: '/entity/diagram/:diagramId/view',
      name: 'DiagramView',
      component: DiagramDetails,
      meta: { authorities: ['ROLE_USER'] }
    }
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ]
});
