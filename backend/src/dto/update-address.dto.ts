import { IsInt, IsOptional, IsString, Length } from 'class-validator';
import { CreateAddressDTO } from './create-address.dto';

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateAddressDTO:
 *       type: object
 *       properties:
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
 *       example:
 *         streetName: "Evergreen Terrace"
 *         streetNumber1: "742"
 *         streetNumber2: "Apt. 1"
 *         state: "Illinois"
 *         city: "Springfield"
 *         postcode: "12345"
 *         countryId: 1
 */

export class UpdateAddressDTO implements Partial<CreateAddressDTO> {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  streetName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  streetNumber1?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  streetNumber2?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  state?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  postcode?: string;

  @IsOptional()
  @IsInt()
  countryId?: number;
}
