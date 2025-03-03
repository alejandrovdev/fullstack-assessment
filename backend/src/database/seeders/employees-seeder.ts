import { AppDataSource } from '../../config/data-source';
import { Employee } from '../../entities/employee.entity';
import { Address } from '../../entities/address.entity';
import { Department } from '../../entities/department.entity';
import { Country } from '../../entities/country.entity';
import * as fs from 'fs';
import * as path from 'path';

export async function seedEmployees(): Promise<void> {
  try {
    const filePath = path.join(__dirname, 'employees.json');
    const employeesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const employeesArray = Array.isArray(employeesData)
      ? employeesData
      : [employeesData];

    const employeeRepository = AppDataSource.getRepository(Employee);
    const addressRepository = AppDataSource.getRepository(Address);
    const departmentRepository = AppDataSource.getRepository(Department);
    const countryRepository = AppDataSource.getRepository(Country);

    for (const employeeData of employeesArray) {
      if (!employeeData.departmentId) {
        throw new Error('Employee departmentId is required.');
      }

      const department = await departmentRepository.findOneBy({
        id: employeeData.departmentId,
      });
      if (!department) {
        throw new Error(
          `Department with id ${employeeData.departmentId} not found. Departments are fixed data and must exist.`,
        );
      }

      employeeData.department = department;

      if (employeeData.address) {
        if (!employeeData.address.countryId) {
          throw new Error('Address countryId is required.');
        }

        const country = await countryRepository.findOneBy({
          id: employeeData.address.countryId,
        });
        if (!country) {
          throw new Error(
            `Country with id ${employeeData.address.countryId} not found. Countries are fixed data and must exist.`,
          );
        }

        employeeData.address.country = country;

        const savedAddress = await addressRepository.save(employeeData.address);
        employeeData.address = savedAddress;
      }

      await employeeRepository.save(employeeData);
    }

    console.log(`${employeesArray.length} employees seeded successfully.`);
  } catch (error) {
    console.error('Error seeding employees:', error);
  }
}
