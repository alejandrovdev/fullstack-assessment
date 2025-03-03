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

import * as countryService from './country.service';

describe('Country Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return an array of countries', async () => {
      const countries = [
        {
          id: 1,
          name: 'Afghanistan',
          code: 'AFG',
          emoji: '🇦🇫',
        },
        {
          id: 2,
          name: 'Aland Islands',
          code: 'ALA',
          emoji: '🇦🇽',
        },
        {
          id: 3,
          name: 'Albania',
          code: 'ALB',
          emoji: '🇦🇱',
        },
      ];

      mockRepository.find.mockResolvedValue(countries);

      const result = await countryService.getAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(countries);
    });
  });
});
