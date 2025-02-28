import { IsOptional, IsString, IsDate } from 'class-validator';
import { CreateEmployeeDTO } from './create-employee.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateEmployeeDTO:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         hireDate:
 *           type: string
 *           format: date
 *         department:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         hireDate: 2025-02-01
 *         department: IT
 *         phone: 123-456-7890
 *         address: 123 Main St
 */
export class UpdateEmployeeDTO implements Partial<CreateEmployeeDTO> {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsDate()
  hireDate?: Date;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
