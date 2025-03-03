import { Router } from 'express';
import { getAllDepartments } from '../../controllers/department.controller';
import { asyncHandler } from '../../middlewares/async-handler.middleware';

const router = Router();

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get all department
 *     tags: [Department V1]
 *     responses:
 *       200:
 *         description: List of all department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(getAllDepartments));

export default router;
