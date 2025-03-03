import { Request, Response } from 'express';
import {
  create,
  getAll,
  getOneById,
  update,
  remove,
} from '../services/employee.service';

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = await create(req.body);

    return res.status(201).json(employee);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllEmployees = async (_: Request, res: Response) => {
  try {
    const employees = await getAll();

    return res.json(employees);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await getOneById(parseInt(id, 10));

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.json(employee);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const employee = await update(parseInt(id, 10), req.body);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.json(employee);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const success = await remove(parseInt(id, 10));

    if (!success) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.json({ message: 'Employee deleted successfully' });
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
