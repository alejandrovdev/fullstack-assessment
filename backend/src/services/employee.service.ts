import { AppDataSource } from '../config/data-source';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';
import { Address } from '../entities/address.entity';
import { Country } from '../entities/country.entity';
import { Employee } from '../entities/employee.entity';

const employeeRepository = AppDataSource.getRepository(Employee);
const addressRepository = AppDataSource.getRepository(Address);
const countryRepository = AppDataSource.getRepository(Country);

export const create = async (data: CreateEmployeeDTO): Promise<Employee> => {
  const country = await countryRepository.findOneBy({
    id: data.address.countryId,
  });

  if (!country) {
    throw new Error('Country not found');
  }

  const address = addressRepository.create({
    ...data.address,
    country,
  });

  const savedAddress = await addressRepository.save(address);

  console.log(data.departmentId);

  const employee = employeeRepository.create({
    firstName: data.firstName,
    lastName: data.lastName,
    hireDate: data.hireDate,
    departmentId: data.departmentId,
    phone: data.phone,
    address: savedAddress,
  });

  const savedEmployee = await employeeRepository.save(employee);

  savedAddress.employee = savedEmployee;

  await addressRepository.save(savedAddress);

  return await employeeRepository.findOneOrFail({
    where: { id: savedEmployee.id },
    relations: ['address'],
  });
};

export const getAll = async (): Promise<Employee[]> => {
  return await employeeRepository.find({
    relations: ['address'],
  });
};

export const getOneById = async (id: number): Promise<Employee | null> => {
  return await employeeRepository.findOne({
    where: { id },
    relations: ['address'],
  });
};

export const update = async (
  id: number,
  data: UpdateEmployeeDTO,
): Promise<Employee | null> => {
  const employee = await employeeRepository.findOne({
    where: { id },
    relations: ['address'],
  });
  if (!employee) {
    return null;
  }

  const { address, ...employeeData } = data;

  if (address && Object.keys(address).length > 0) {
    if ('countryId' in address && address.countryId !== undefined) {
      const country = await countryRepository.findOneBy({
        id: address.countryId,
      });

      if (!country) {
        throw new Error('Country not found');
      }

      employee.address.country = country;
    }

    addressRepository.merge(employee.address, address);

    await addressRepository.save(employee.address);
  }

  if (Object.keys(employeeData).length > 0) {
    employeeRepository.merge(employee, employeeData);
    await employeeRepository.save(employee);
  }

  return await employeeRepository.findOne({
    where: { id: employee.id },
    relations: ['address'],
  });
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await employeeRepository.delete(id);

  return typeof result.affected === 'number' && result.affected > 0;
};
