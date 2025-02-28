import { AppDataSource } from '../config/data-source';
import { Employee } from '../entities/employee.entity';

const employeeRepository = AppDataSource.getRepository(Employee);

export const create = async (data: Partial<Employee>): Promise<Employee> => {
  const employee = employeeRepository.create(data);

  return await employeeRepository.save(employee);
};

export const getAll = async (): Promise<Employee[]> => {
  return await employeeRepository.find();
};

export const getOneById = async (id: number): Promise<Employee | null> => {
  return await employeeRepository.findOneBy({ id });
};

export const update = async (
  id: number,
  data: Partial<Employee>,
): Promise<Employee | null> => {
  const employee = await employeeRepository.findOneBy({ id });

  if (!employee) {
    return null;
  }

  employeeRepository.merge(employee, data);

  return await employeeRepository.save(employee);
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await employeeRepository.delete(id);

  return (
    result.affected !== undefined &&
    result.affected !== null &&
    result.affected > 0
  );
};
