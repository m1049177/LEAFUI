import { IOraganizationalUnit } from '../model/oraganizational-unit.model';
import { ILineOfBusiness } from '../model/line-of-business.model';
import { IApplication } from '../model/application.model';
import { IBusinessFunction } from '../model/business-function.model';
import { ICapabilities } from '../model/capabilities.model';
import { IBusinessProcess } from '../model/business-process.model';
import { IActivity } from '../model/activity.model';
import { ITask } from '../model/task.model';
import { ITechnology } from '../model/technology.model';
import { IExpenditure } from '../model/expenditure.model';
import axios from 'axios';
import { IBudget } from '../model/budget.model';
import { IFunctionality } from '../model/functionality.model';
import { IReport } from '../model/report.model';
import { IIntegration } from '../model/integration.model';
import { IRevenue } from '../model/revenue.model';
import { IBrand } from '../model/brand.model';
import { IEvaluation } from '../model/evaluation.model';
import { IDiagram } from '../model/diagram.model';

export default class FilterService {
  public OrganizationalFilter(oraganizationalUnits: IOraganizationalUnit[], companyId: any): Promise<IOraganizationalUnit[]> {
    return new Promise<IOraganizationalUnit[]>(resolve => {
      oraganizationalUnits = oraganizationalUnits.filter(element => element.company?.id === companyId);
      resolve(oraganizationalUnits);
    });
  }
  public LineOfBusinessFilter(lineOfBusinesses: ILineOfBusiness[], companyId: any): Promise<ILineOfBusiness[]> {
    return new Promise<ILineOfBusiness[]>(resolve => {
      lineOfBusinesses = lineOfBusinesses.filter(element => element.oraganizationalUnit?.company?.id === companyId);
      resolve(lineOfBusinesses);
    });
  }
  public ApplicationFilter(applications: IApplication[], companyId: any): Promise<IApplication[]> {
    return new Promise<IApplication[]>(resolve => {
      applications = applications.filter(element => element.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(applications);
      resolve(applications);
    });
  }

  public BusinessFunctionFilter(businessFunctions: IBusinessFunction[], companyId: any): Promise<IBusinessFunction[]> {
    return new Promise<IBusinessFunction[]>(resolve => {
      businessFunctions = businessFunctions.filter(element => element.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      resolve(businessFunctions);
    });
  }
  public CapabilitiesFilter(capabilities: ICapabilities[], companyId: any): Promise<ICapabilities[]> {
    return new Promise<ICapabilities[]>(resolve => {
      capabilities = capabilities.filter(element => element.businessFunction?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(capabilities);
      resolve(capabilities);
    });
  }
  public BusinessProcessFilter(businessProcesses: IBusinessProcess[], companyId: any): Promise<IBusinessProcess[]> {
    return new Promise<IBusinessProcess[]>(resolve => {
      businessProcesses = businessProcesses.filter(
        element => element.capabilities?.businessFunction?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId
      );
      resolve(businessProcesses);
    });
  }
  public ActivityFilter(activity: IActivity[], companyId: any): Promise<IActivity[]> {
    return new Promise<IActivity[]>(resolve => {
      activity = activity.filter(
        element => element.businessProcess?.capabilities?.businessFunction?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId
      );
      resolve(activity);
    });
  }
  public TaskFilter(tasks: ITask[], companyId: any): Promise<ITask[]> {
    return new Promise<ITask[]>(resolve => {
      tasks = tasks.filter(
        element =>
          element.activity?.businessProcess?.capabilities?.businessFunction?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId
      );
      // console.log(tasks);
      resolve(tasks);
    });
  }
  public BudgetFilter(budgets: IBudget[], companyId: any): Promise<IBudget[]> {
    return new Promise<IBudget[]>(resolve => {
      budgets = budgets.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(budgets);
      resolve(budgets);
    });
  }
  public FunctionalityFilter(functionality: IFunctionality[], companyId: any): Promise<IFunctionality[]> {
    return new Promise<IFunctionality[]>(resolve => {
      functionality = functionality.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(functionality);
      resolve(functionality);
    });
  }
  public ReportFilter(report: IReport[], companyId: any): Promise<IReport[]> {
    return new Promise<IReport[]>(resolve => {
      report = report.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(report);
      resolve(report);
    });
  }
  public IntegrationFilter(integration: IIntegration[], companyId: any): Promise<IIntegration[]> {
    return new Promise<IIntegration[]>(resolve => {
      integration = integration.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(integration);
      resolve(integration);
    });
  }
  public RevenueFilter(revenue: IRevenue[], companyId: any): Promise<IRevenue[]> {
    return new Promise<IRevenue[]>(resolve => {
      revenue = revenue.filter(element => element.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(revenue);
      resolve(revenue);
    });
  }
  public BrandFilter(brand: IBrand[], companyId: any): Promise<IBrand[]> {
    return new Promise<IBrand[]>(resolve => {
      brand = brand.filter(element => element.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(brand);
      resolve(brand);
    });
  }

  public ExpenditureFilter(expenditure: IExpenditure[], companyId: any): Promise<IExpenditure[]> {
    return new Promise<IExpenditure[]>(resolve => {
      expenditure = expenditure.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(expenditure);
      resolve(expenditure);
    });
  }
  public TechnologyFilter(technology: ITechnology[], companyId: any): Promise<ITechnology[]> {
    return new Promise<ITechnology[]>(resolve => {
      technology = technology.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(technology);
      resolve(technology);
    });
  }

  public EvaluationFilter(evaluation: IEvaluation[], companyId: any): Promise<IEvaluation[]> {
    return new Promise<IEvaluation[]>(resolve => {
      evaluation = evaluation.filter(element => element.application?.lineOfBusiness?.oraganizationalUnit?.company?.id === companyId);
      // console.log(evaluation);
      resolve(evaluation);
    });
  }
  public DiagramFilter(diagram: IDiagram[], companyId: any): Promise<IDiagram[]> {
    return new Promise<IDiagram[]>(resolve => {
      diagram = diagram.filter(element => element.company?.id === companyId);
      // console.log(diagram);
      resolve(diagram);
    });
  }

  public delete(id: number, url: string): Promise<any> {
    console.log(`${url}/${id}`);
    return new Promise<any>(resolve => {
      axios.delete(`${url}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }
}
