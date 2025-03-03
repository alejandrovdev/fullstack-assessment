import { Request, Response } from 'express';
import * as departmentService from '../services/department.service';
import { getAllDepartments } from './department.controller';

jest.mock('../services/department.service');

const mockRequest = (data: Partial<Request>): Request => data as Request;

const mockResponse = (): Response => {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as Response;
};

describe('Department Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllDepartments', () => {
    it('should return all department', async () => {
      const req = mockRequest({});
      const res = mockResponse();
      const department = [
        {
          id: 1,
          code: 'it',
          name: 'IT',
        },
        {
          id: 2,
          code: 'hr',
          name: 'HR',
        },
        {
          id: 3,
          code: 'finance',
          name: 'Finance',
        },
      ];

      (departmentService.getAll as jest.Mock).mockResolvedValue(department);

      await getAllDepartments(req, res);

      expect(departmentService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(department);
    });

    it('should return 500 if an error occurs when fetching department', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      (departmentService.getAll as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await getAllDepartments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });
});
