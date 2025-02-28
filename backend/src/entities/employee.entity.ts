import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
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
 *         id: 1
 *         firstName: John
 *         lastName: Doe
 *         hireDate: 2025-02-01
 *         department: IT
 *         phone: 123-456-7890
 *         address: 123 Main St
 */
@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  @IsOptional()
  id?: number;

  @Column({ name: 'first_name' })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @Column({ name: 'hire_date' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate!: Date;

  @Column({ name: 'department' })
  @IsNotEmpty()
  @IsString()
  department!: string;

  @Column({ name: 'phone' })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @Column({ name: 'address' })
  @IsNotEmpty()
  @IsString()
  address!: string;
}
