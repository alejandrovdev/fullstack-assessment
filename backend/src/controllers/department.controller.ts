import { Request, Response } from 'express';
import { getAll } from '../services/department.service';

export const getAllDepartments = async (_: Request, res: Response) => {
  try {
    const departments = await getAll();

    return res.json(departments);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
