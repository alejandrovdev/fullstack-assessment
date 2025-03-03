import { AppDataSource } from '../../config/data-source';
import { Country } from '../../entities/country.entity';
import * as fs from 'fs';
import * as path from 'path';

export async function seedCountries(): Promise<void> {
  try {
    const filePath = path.join(__dirname, 'countries.json');
    const countriesData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const countryRepository = AppDataSource.getRepository(Country);
    await countryRepository.save(countriesData);

    console.log('Countries seeded successfully.');
  } catch (error) {
    console.error('Error seeding countries:', error);
  }
}
