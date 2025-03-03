import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { Department } from './department.entity';
import { Address } from './address.entity';

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
 *         phone:
 *           type: string
 *         hireDate:
 *           type: string
 *           format: date
 *         departmentId:
 *           type: integer
 *         department:
 *           $ref: '#/components/schemas/Department'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *       example:
 *         id: 1
 *         firstName: "John"
 *         lastName: "Doe"
 *         phone: "555-1234"
 *         hireDate: "2025-01-01"
 *         departmentId: 10
 *         address:
 *           id: 5
 *           streetName: "Evergreen Terrace"
 *           streetNumber1: "742"
 *           streetNumber2: "A"
 *           state: "Springfield"
 *           city: "Springfield"
 *           postcode: "12345"
 *           countryId: 1
 */
@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
  })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @Column({
    name: 'hire_date',
    type: 'date',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate!: Date;

  @RelationId((employee: Employee) => employee.department)
  departmentId!: number;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'department_id' })
  @IsNotEmpty()
  department!: Department;

  @OneToOne(() => Address, (address) => address.employee, {
    onDelete: 'CASCADE',
  })
  address!: Address;
}
