import { Router } from 'express';
import { getAllCountries } from '../../controllers/country.controller';
import { asyncHandler } from '../../middlewares/async-handler.middleware';

const router = Router();

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Countries V1]
 *     responses:
 *       200:
 *         description: List of all countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 *       500:
 *         description: Internal server error
 */
router.get('/', asyncHandler(getAllCountries));

export default router;
