import { IsNotEmpty, IsString, IsDate } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEmployeeDTO:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - hireDate
 *         - department
 *         - phone
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         hireDate:
 *           type: Date
 *         department:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *       example:
 *         firstName: John
 *         lastName: Doe
 *         hireDate: 2025-02-28
 *         department: IT
 *         phone: 123-456-7890
 *         address: 123 Main St
 */
export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsNotEmpty()
  @IsDate()
  hireDate!: Date;

  @IsNotEmpty()
  @IsString()
  department!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsString()
  address!: string;
}
