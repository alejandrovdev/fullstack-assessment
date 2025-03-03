import { useAxios } from '../shared/hooks/useAxios';
import ICountry from '../shared/interfaces/country.interface';
import IDepartment from '../shared/interfaces/department.interface';
import { FC, PropsWithChildren, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    data: countries,
    loading: loadingCountries,
    fetch: fetchCountries,
  } = useAxios<ICountry[]>();

  const {
    data: departments,
    loading: loadingDepartments,
    fetch: fetchDepartments,
  } = useAxios<IDepartment[]>();

  useEffect(() => {
    fetchCountries({ url: '/countries' });
  }, [fetchCountries]);

  useEffect(() => {
    fetchDepartments({ url: '/departments' });
  }, [fetchDepartments]);

  return (
    <AppContext.Provider
      value={{
        countries: countries || [],
        departments: departments || [],
        loadingCountries,
        loadingDepartments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
