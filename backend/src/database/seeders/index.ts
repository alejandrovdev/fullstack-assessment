import { AppDataSource } from '../../config/data-source';
import { seedCountries } from './country-seeder';
import { seedDepartments } from './department-seeder';
import { seedEmployees } from './employees-seeder';

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connection established.');

    await seedCountries();
    await seedDepartments();
    await seedEmployees();

    console.log('All seeders executed successfully.');

    process.exit(0);
  })
  .catch((error: unknown) => {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  });
