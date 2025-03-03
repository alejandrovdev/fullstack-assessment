import { AppDataSource } from '../config/data-source';
import {
  create,
  getAll,
  getOneById,
  update,
  remove,
} from '../services/employee.service';
import { CreateEmployeeDTO } from '../dto/create-employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';
import { Country } from '../entities/country.entity';
import { Employee } from '../entities/employee.entity';

jest.mock('../config/data-source', () => {
  const mockCountry = {
    id: 1,
    code: 'US',
    name: 'United States',
    emoji: '🇺🇸',
  };

  const mockEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    hireDate: new Date('2025-02-01'),
    departmentId: 1,
    phone: '123-456-7890',
    address: {
      id: 1,
      streetName: 'Evergreen Terrace',
      streetNumber1: '742',
      streetNumber2: 'Apt. 1',
      state: 'Illinois',
      city: 'Springfield',
      postcode: '12345',
      countryId: 1,
      country: mockCountry,
      employee: undefined,
    },
  };

  const deletedEmployeeIds: number[] = [];

  const mockRepository = {
    create: jest.fn().mockImplementation((data) => {
      return { ...data, id: data.id || 1 };
    }),
    save: jest.fn().mockImplementation((data) => {
      if (data.address) {
        data.address = {
          ...data.address,
          id: 1,
          country: mockCountry,
          employee: data,
        };
      }
      return Promise.resolve({ ...data, id: data.id || 1 });
    }),
    delete: jest.fn().mockImplementation((id: number) => {
      deletedEmployeeIds.push(id);
      return Promise.resolve({ affected: 1 });
    }),
    find: jest.fn().mockResolvedValue([mockEmployee]),
    findOne: jest
      .fn()
      .mockImplementation(({ where: { id } }: { where: { id: number } }) => {
        if (id === 1 && !deletedEmployeeIds.includes(id)) {
          return Promise.resolve(mockEmployee);
        } else {
          return Promise.resolve(null);
        }
      }),
    findOneBy: jest.fn().mockImplementation((criteria: { id: number }) => {
      if (criteria.id === 1 && !deletedEmployeeIds.includes(criteria.id)) {
        return Promise.resolve(mockEmployee);
      } else {
        return Promise.resolve(null);
      }
    }),
    findOneOrFail: jest
      .fn()
      .mockImplementation(({ where: { id } }: { where: { id: number } }) => {
        if (id === 1 && !deletedEmployeeIds.includes(id)) {
          return Promise.resolve(mockEmployee);
        } else {
          return Promise.reject(new Error('Not found'));
        }
      }),
    merge: jest.fn().mockImplementation((target, source) => {
      return Object.assign(target, source);
    }),
  };

  return {
    AppDataSource: {
      initialize: jest.fn().mockResolvedValue(true),
      destroy: jest.fn().mockResolvedValue(true),
      getRepository: jest.fn(() => mockRepository),
    },
  };
});

describe('Employee Service)', () => {
  let testCountry: Country;
  let createdEmployee: Employee;

  beforeAll(async () => {
    await AppDataSource.initialize();

    testCountry = {
      id: 1,
      code: 'US',
      name: 'United States',
      emoji: '🇺🇸',
    } as Country;
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it('should create an employee with full mock data', async () => {
    const employeeData: CreateEmployeeDTO = {
      firstName: 'John',
      lastName: 'Doe',
      hireDate: new Date('2025-02-01'),
      departmentId: 1,
      phone: '123-456-7890',
      address: {
        streetName: 'Evergreen Terrace',
        streetNumber1: '742',
        streetNumber2: 'Apt. 1',
        state: 'Illinois',
        city: 'Springfield',
        postcode: '12345',
        countryId: testCountry.id as number,
      },
    };

    createdEmployee = await create(employeeData);

    expect(createdEmployee).toBeDefined();
    expect(createdEmployee.firstName).toBe('John');
    expect(createdEmployee.address).toBeDefined();
    expect(createdEmployee.address.city).toBe('Springfield');
    expect(createdEmployee.address.country).toEqual(testCountry);
  });

  it('should get all employees with full mock data', async () => {
    const employees = await getAll();

    expect(Array.isArray(employees)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);
    expect(employees[0]).toHaveProperty('firstName', 'John');
    expect(employees[0]).toHaveProperty('address');
    expect(employees[0].address).toHaveProperty('city', 'Springfield');
    expect(employees[0].address).toHaveProperty('country');
    expect(employees[0].address.country).toEqual(testCountry);
  });

  it('should get one employee by id with full mock data', async () => {
    const employee = await getOneById(createdEmployee.id as number);

    expect(employee).toBeDefined();
    expect(employee?.id).toBe(1);
    expect(employee?.address).toBeDefined();
    expect(employee?.address.country).toEqual(testCountry);
  });

  it('should update an employee with full mock data', async () => {
    const updateData: UpdateEmployeeDTO = {
      firstName: 'Jane',
      address: {
        city: 'New Springfield',
      },
    };

    const updatedEmployee = await update(
      createdEmployee.id as number,
      updateData,
    );

    expect(updatedEmployee).toBeDefined();
    expect(updatedEmployee?.firstName).toBe('Jane');
    expect(updatedEmployee?.address.city).toBe('New Springfield');
    expect(updatedEmployee?.address.country).toEqual(testCountry);
  });

  it('should remove an employee and return null on subsequent get', async () => {
    const result = await remove(createdEmployee.id as number);

    expect(result).toBe(true);

    const employeeAfterDelete = await getOneById(createdEmployee.id as number);

    expect(employeeAfterDelete).toBeNull();
  });
});
