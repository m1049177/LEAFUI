export const enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export interface IEmployee {
  id?: number;
  employeeId?: string;
  name?: string;
  dateOfJoining?: Date;
  gender?: Gender;
  address?: string;
  designation?: string;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public employeeId?: string,
    public name?: string,
    public dateOfJoining?: Date,
    public gender?: Gender,
    public address?: string,
    public designation?: string
  ) {}
}
