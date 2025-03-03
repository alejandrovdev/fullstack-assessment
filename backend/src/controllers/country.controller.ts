import { Request, Response } from 'express';
import { getAll } from '../services/country.service';

export const getAllCountries = async (_: Request, res: Response) => {
  try {
    const countries = await getAll();

    return res.json(countries);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
