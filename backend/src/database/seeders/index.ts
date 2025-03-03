import { AppDataSource } from '../../config/data-source';
import { seedCountries } from './country-seeder';
import { seedDepartments } from './department-seeder';

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connection established.');

    await seedCountries();
    await seedDepartments();

    console.log('All seeders executed successfully.');

    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });
