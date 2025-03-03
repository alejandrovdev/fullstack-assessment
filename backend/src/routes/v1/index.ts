import { Router } from 'express';
import countryRoutes from './country.routes';
import departmentRoutes from './department.routes';
import employeeRoutes from './employee.routes';

const router = Router();

router.use('/countries', countryRoutes);
router.use('/departments', departmentRoutes);
router.use('/employees', employeeRoutes);

export default router;
