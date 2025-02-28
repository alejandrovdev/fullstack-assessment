const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
};

jest.mock('../config/data-source', () => ({
  AppDataSource: {
    getRepository: jest.fn(() => mockRepository),
  },
}));

import * as employeeService from './employee.service';
import { Employee } from '../entities/employee.entity';

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save an employee', async () => {
      const inputData: Partial<Employee> = {
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        department: 'IT',
        phone: '1234567890',
        address: '123 Main St',
      };

      mockRepository.create.mockReturnValue(inputData);
      mockRepository.save.mockResolvedValue({ ...inputData, id: 1 });

      const result = await employeeService.create(inputData);

      expect(mockRepository.create).toHaveBeenCalledWith(inputData);
      expect(mockRepository.save).toHaveBeenCalledWith(inputData);
      expect(result).toEqual({ ...inputData, id: 1 });
    });
  });

  describe('getAll', () => {
    it('should return an array of employees', async () => {
      const employees = [
        {
          id: 1,
          firstName: 'Alice',
          lastName: 'Smith',
          hireDate: new Date(),
          department: 'HR',
          phone: '1111111111',
          address: 'Address 1',
        },
        {
          id: 2,
          firstName: 'Bob',
          lastName: 'Brown',
          hireDate: new Date(),
          department: 'Finance',
          phone: '2222222222',
          address: 'Address 2',
        },
      ];

      mockRepository.find.mockResolvedValue(employees);

      const result = await employeeService.getAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(employees);
    });
  });

  describe('getOneById', () => {
    it('should return an employee when found', async () => {
      const employee = {
        id: 1,
        firstName: 'Charlie',
        lastName: 'Davis',
        hireDate: new Date(),
        department: 'Sales',
        phone: '3333333333',
        address: 'Address 3',
      };

      mockRepository.findOneBy.mockResolvedValue(employee);

      const result = await employeeService.getOneById(1);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(employee);
    });

    it('should return null when employee is not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await employeeService.getOneById(999);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update an employee if found', async () => {
      const existing = {
        id: 1,
        firstName: 'Dana',
        lastName: 'Evans',
        hireDate: new Date(),
        department: 'Marketing',
        phone: '4444444444',
        address: 'Address 4',
      };

      mockRepository.findOneBy.mockResolvedValue(existing);
      mockRepository.merge.mockImplementation((emp, data) =>
        Object.assign(emp, data),
      );

      const updatedData: Partial<Employee> = {
        firstName: 'Dana Updated',
        department: 'Marketing Updated',
      };

      mockRepository.save.mockResolvedValue({ ...existing, ...updatedData });

      const result = await employeeService.update(1, updatedData);

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockRepository.merge).toHaveBeenCalledWith(existing, updatedData);
      expect(mockRepository.save).toHaveBeenCalledWith(existing);
      expect(result).toEqual({ ...existing, ...updatedData });
    });

    it('should return null if employee is not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await employeeService.update(999, { firstName: 'Test' });

      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should return true if deletion was successful', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await employeeService.remove(1);

      expect(mockRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('should return false if deletion was not successful', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await employeeService.remove(999);

      expect(mockRepository.delete).toHaveBeenCalledWith(999);
      expect(result).toBe(false);
    });
  });
});
