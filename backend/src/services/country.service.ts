import { AppDataSource } from '../config/data-source';
import { Country } from '../entities/country.entity';

const countryRepository = AppDataSource.getRepository(Country);

export const getAll = async (): Promise<Country[]> => {
  return await countryRepository.find();
};
