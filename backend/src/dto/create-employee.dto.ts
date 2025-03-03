import {
  ValidateNested,
  IsNotEmpty,
  IsString,
  IsDate,
  Length,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDTO } from './create-address.dto';

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
 *         - departmentId
 *         - phone
 *         - address
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         hireDate:
 *           type: string
 *           format: date
 *         departmentId:
 *           type: integer
 *         phone:
 *           type: string
 *         address:
 *           $ref: '#/components/schemas/CreateAddressDTO'
 *       example:
 *         firstName: "John"
 *         lastName: "Doe"
 *         hireDate: "2025-02-01"
 *         departmentId: 1
 *         phone: "123-456-7890"
 *         address:
 *           streetName: "Evergreen Terrace"
 *           streetNumber1: "742"
 *           streetNumber2: "Apt. 1"
 *           state: "Illinois"
 *           city: "Springfield"
 *           postcode: "12345"
 *           countryId: 1
 */

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  lastName!: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  hireDate!: Date;

  @IsNotEmpty()
  @IsInt()
  departmentId!: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  phone!: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateAddressDTO)
  address!: CreateAddressDTO;
}
