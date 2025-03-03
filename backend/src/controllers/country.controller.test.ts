import { Request, Response } from 'express';
import * as countryService from '../services/country.service';
import { getAllCountries } from './country.controller';

jest.mock('../services/country.service');

const mockRequest = (data: Partial<Request>): Request => data as Request;

const mockResponse = (): Response => {
  const res: Partial<Response> = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res as Response;
};

describe('Country Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCountries', () => {
    it('should return all countries', async () => {
      const req = mockRequest({});
      const res = mockResponse();
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

      (countryService.getAll as jest.Mock).mockResolvedValue(countries);

      await getAllCountries(req, res);

      expect(countryService.getAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(countries);
    });

    it('should return 500 if an error occurs when fetching countries', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      (countryService.getAll as jest.Mock).mockRejectedValue(
        new Error('Error'),
      );

      await getAllCountries(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });
});
