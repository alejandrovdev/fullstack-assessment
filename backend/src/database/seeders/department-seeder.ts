import { AppDataSource } from '../../config/data-source';
import { Department } from '../../entities/department.entity';
import * as fs from 'fs';
import * as path from 'path';

export async function seedDepartments(): Promise<void> {
  try {
    const filePath = path.join(__dirname, 'departments.json');
    const departmentsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const departmentRepository = AppDataSource.getRepository(Department);
    await departmentRepository.save(departmentsData);

    console.log('Departments seeded successfully.');
  } catch (error) {
    console.error('Error seeding departments:', error);
  }
}
