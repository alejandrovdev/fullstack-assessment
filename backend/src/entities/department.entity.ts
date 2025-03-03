import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Employee } from './employee.entity';

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         name:
 *           type: string
 *       example:
 *         id: 1
 *         code: "sales"
 *         name: "Sales"
 */
@Entity({ name: 'departments' })
export class Department extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  code!: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees!: Employee[];
}
