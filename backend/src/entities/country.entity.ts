import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from './address.entity';

/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         code:
 *           type: string
 *         name:
 *           type: string
 *         emoji:
 *           type: string
 *       example:
 *         id: 1
 *         code: "AF"
 *         name: "Afghanistan"
 *         emoji: "🇦🇫"
 */
@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id?: number;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 3,
    unique: true,
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

  @Column({
    name: 'emoji',
    type: 'varchar',
    length: 10,
  })
  @IsNotEmpty()
  @IsString()
  emoji!: string;

  @OneToMany(() => Address, (address) => address.country)
  addresses!: Address[];
}
