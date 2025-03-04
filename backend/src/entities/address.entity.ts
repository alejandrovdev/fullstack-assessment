import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Country } from './country.entity';
import { Employee } from './employee.entity';

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         streetName:
 *           type: string
 *         streetNumber1:
 *           type: string
 *         streetNumber2:
 *           type: string
 *           nullable: true
 *         state:
 *           type: string
 *         city:
 *           type: string
 *         postcode:
 *           type: string
 *         countryId:
 *           type: integer
 *         country:
 *           $ref: '#/components/schemas/Country'
 *       example:
 *         id: 1
 *         streetName: "Evergreen Terrace"
 *         streetNumber1: "742"
 *         streetNumber2: "A"
 *         state: "Springfield"
 *         city: "Springfield"
 *         postcode: "12345"
 *         countryId: 1
 *         country:
 *           id: 1
 *           code: "AF"
 *           name: "Afghanistan"
 *           emoji: "🇦🇫"
 */
@Entity({ name: 'addresses' })
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({
    name: 'street_name',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  streetName!: string;

  @Column({
    name: 'street_number_1',
    type: 'varchar',
    length: 50,
  })
  @IsNotEmpty()
  @IsString()
  streetNumber1!: string;

  @Column({
    name: 'street_number_2',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  streetNumber2?: string;

  @Column({
    name: 'state',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  state!: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 100,
  })
  @IsNotEmpty()
  @IsString()
  city!: string;

  @Column({
    name: 'postcode',
    type: 'varchar',
    length: 20,
  })
  @IsNotEmpty()
  @IsString()
  postcode!: string;

  @Column({
    name: 'country_id',
    type: 'integer',
  })
  @IsNotEmpty()
  @IsInt()
  countryId!: number;

  @ManyToOne(() => Country, (country) => country.addresses, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'country_id' })
  @IsNotEmpty()
  country!: Country;

  @OneToOne(() => Employee, (employee) => employee.address, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  @IsNotEmpty()
  employee!: Employee;
}
