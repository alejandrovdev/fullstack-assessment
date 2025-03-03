import {
  IsOptional,
  IsString,
  IsDate,
  ValidateNested,
  Length,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDTO } from './update-address.dto';

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
 *         departmentId:
 *           type: integer
 *         phone:
 *           type: string
 *         address:
 *           $ref: '#/components/schemas/UpdateAddressDTO'
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
export class UpdateEmployeeDTO {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastName?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  hireDate?: Date;

  @IsOptional()
  @IsInt()
  departmentId?: number;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  phone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressDTO)
  address?: UpdateAddressDTO;
}
