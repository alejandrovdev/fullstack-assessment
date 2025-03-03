import IAddress from './address.interface';

interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  hireDate: string;
  departmentId: number;
  address: IAddress;
}

export default IEmployee;
