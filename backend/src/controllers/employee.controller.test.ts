import { Request, Response } from 'express';
import * as employeeService from '../services/employee.service';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller';

jest.mock('../services/employee.service');

const mockResponse = (): Response => {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as Response;
};

const mockEmployee = {
  firstName: 'John',
  lastName: 'Doe',
  hireDate: '2025-02-01',
  departmentId: 1,
  phone: '123-456-7890',
  address: {
    streetName: 'Evergreen Terrace',
    streetNumber1: '742',
    streetNumber2: 'Apt. 1',
    state: 'Illinois',
    city: 'Springfield',
    postcode: '12345',
    countryId: 1,
  },
};

describe('Employee Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    it('should return 201 and the created employee with complete payload', async () => {
      const req = { body: mockEmployee } as Request;
      const res = mockResponse();
      const employeeMock = { id: 1, ...mockEmployee };

      (employeeService.create as jest.Mock).mockResolvedValue(employeeMock);

      await createEmployee(req, res);

      expect(employeeService.create).toHaveBeenCalledWith(mockEmployee);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(employeeMock);
    });

    it('should return 500 in case of an error', async () => {
      const req = { body: mockEmployee } as Request;
      const res = mockResponse();

      (employeeService.create as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });

  describe('getAllEmployees', () => {
    it('should return the list of employees', async () => {
      const req = {} as Request;
      const res = mockResponse();
      const employeesMock = [{ id: 1 }, { id: 2 }];

      (employeeService.getAll as jest.Mock).mockResolvedValue(employeesMock);

      await getAllEmployees(req, res);

      expect(employeeService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(employeesMock);
    });

    it('should return 500 in case of an error', async () => {
      const req = {} as Request;
      const res = mockResponse();

      (employeeService.getAll as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await getAllEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });

  describe('getEmployeeById', () => {
    it('should return the employee if found', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = mockResponse();
      const employeeMock = { id: 1, firstName: 'John' };

      (employeeService.getOneById as jest.Mock).mockResolvedValue(employeeMock);

      await getEmployeeById(req, res);

      expect(employeeService.getOneById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(employeeMock);
    });

    it('should return 404 if the employee is not found', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = mockResponse();

      (employeeService.getOneById as jest.Mock).mockResolvedValue(null);

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 in case of an error', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = mockResponse();

      (employeeService.getOneById as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });

  describe('updateEmployee', () => {
    it('should return the updated employee if found', async () => {
      const req = {
        params: { id: '1' },
        body: { firstName: 'Jane' },
      } as unknown as Request;

      const res = mockResponse();
      const employeeMock = { id: 1, firstName: 'Jane' };

      (employeeService.update as jest.Mock).mockResolvedValue(employeeMock);

      await updateEmployee(req, res);

      expect(employeeService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.json).toHaveBeenCalledWith(employeeMock);
    });

    it('should return 404 if the employee is not found', async () => {
      const req = { params: { id: '1' }, body: {} } as unknown as Request;
      const res = mockResponse();

      (employeeService.update as jest.Mock).mockResolvedValue(null);

      await updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 in case of an error', async () => {
      const req = { params: { id: '1' }, body: {} } as unknown as Request;
      const res = mockResponse();

      (employeeService.update as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });

  describe('deleteEmployee', () => {
    it('should return a success message if deletion was successful', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = mockResponse();

      (employeeService.remove as jest.Mock).mockResolvedValue(true);

      await deleteEmployee(req, res);

      expect(employeeService.remove).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Employee deleted successfully',
      });
    });

    it('should return 404 if the employee is not found', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = mockResponse();

      (employeeService.remove as jest.Mock).mockResolvedValue(false);

      await deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 in case of an error', async () => {
      const req = { params: { id: '1' } } as unknown as Request;
      const res = mockResponse();

      (employeeService.remove as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });
});
