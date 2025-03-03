import { createContext } from 'react';
import ICountry from '../shared/interfaces/country.interface';
import IDepartment from '../shared/interfaces/department.interface';

export interface IAppContextProps {
  countries: ICountry[] | undefined;
  departments: IDepartment[] | undefined;
  loadingCountries: boolean;
  loadingDepartments: boolean;
}

export const AppContext = createContext<IAppContextProps>({
  countries: [],
  departments: [],
  loadingCountries: false,
  loadingDepartments: false,
});
