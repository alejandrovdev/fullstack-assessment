import { AppDataSource } from '../config/data-source';
import { Department } from '../entities/department.entity';

const departmentRepository = AppDataSource.getRepository(Department);

export const getAll = async (): Promise<Department[]> => {
  return await departmentRepository.find();
};
