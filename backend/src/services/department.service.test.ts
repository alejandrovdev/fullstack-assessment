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

import * as departmentService from './department.service';

describe('Department Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return an array of departments', async () => {
      const departments = [
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

      mockRepository.find.mockResolvedValue(departments);

      const result = await departmentService.getAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(departments);
    });
  });
});
