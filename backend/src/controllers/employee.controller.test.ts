import { Request, Response } from 'express';
import * as employeeService from '../services/employee.service';
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from './employee.controller';

jest.mock('../services/employee.service');

const mockRequest = (data: Partial<Request>): Request => data as Request;

const mockResponse = (): Response => {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as Response;
};

describe('Employee Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    it('should create an employee and return 201 status', async () => {
      const req = mockRequest({
        body: {
          firstName: 'John',
          lastName: 'Doe',
          hireDate: new Date(),
          department: 'IT',
          phone: '1234567890',
          address: '123 Main St',
        },
      });

      const res = mockResponse();
      const createdEmployee = { ...req.body, id: 1 };

      (employeeService.create as jest.Mock).mockResolvedValue(createdEmployee);

      await createEmployee(req, res);

      expect(employeeService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdEmployee);
    });

    it('should return 500 if an error occurs during creation', async () => {
      const req = mockRequest({ body: {} });
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
    it('should return all employees', async () => {
      const req = mockRequest({});
      const res = mockResponse();
      const employees = [
        { id: 1, firstName: 'Alice' },
        { id: 2, firstName: 'Bob' },
      ];

      (employeeService.getAll as jest.Mock).mockResolvedValue(employees);

      await getAllEmployees(req, res);

      expect(employeeService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(employees);
    });

    it('should return 500 if an error occurs when fetching employees', async () => {
      const req = mockRequest({});
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
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();
      const employee = { id: 1, firstName: 'Charlie' };

      (employeeService.getOneById as jest.Mock).mockResolvedValue(employee);

      await getEmployeeById(req, res);

      expect(employeeService.getOneById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(employee);
    });

    it('should return 404 if the employee is not found', async () => {
      const req = mockRequest({ params: { id: '999' } });
      const res = mockResponse();

      (employeeService.getOneById as jest.Mock).mockResolvedValue(null);

      await getEmployeeById(req, res);

      expect(employeeService.getOneById).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 if an error occurs', async () => {
      const req = mockRequest({ params: { id: '1' } });
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
    it('should update an employee and return the updated employee', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: { firstName: 'Dana Updated' },
      });

      const res = mockResponse();
      const updatedEmployee = { id: 1, firstName: 'Dana Updated' };

      (employeeService.update as jest.Mock).mockResolvedValue(updatedEmployee);

      await updateEmployee(req, res);

      expect(employeeService.update).toHaveBeenCalledWith(1, req.body);
      expect(res.json).toHaveBeenCalledWith(updatedEmployee);
    });

    it('should return 404 if employee is not found during update', async () => {
      const req = mockRequest({
        params: { id: '999' },
        body: { firstName: 'Test' },
      });
      const res = mockResponse();

      (employeeService.update as jest.Mock).mockResolvedValue(null);

      await updateEmployee(req, res);

      expect(employeeService.update).toHaveBeenCalledWith(999, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 if an error occurs during update', async () => {
      const req = mockRequest({
        params: { id: '1' },
        body: { firstName: 'Dana Updated' },
      });
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
    it('should delete an employee successfully', async () => {
      const req = mockRequest({ params: { id: '1' } });
      const res = mockResponse();

      (employeeService.remove as jest.Mock).mockResolvedValue(true);

      await deleteEmployee(req, res);

      expect(employeeService.remove).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Employee deleted successfully',
      });
    });

    it('should return 404 if employee is not found during deletion', async () => {
      const req = mockRequest({ params: { id: '999' } });
      const res = mockResponse();

      (employeeService.remove as jest.Mock).mockResolvedValue(false);

      await deleteEmployee(req, res);

      expect(employeeService.remove).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 if an error occurs during deletion', async () => {
      const req = mockRequest({ params: { id: '1' } });
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
