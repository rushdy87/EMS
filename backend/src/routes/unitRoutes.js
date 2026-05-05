import express from 'express';
import * as unitController from '../controllers/unitController.js';
import { validateIdParam } from '../middlewares/index.js';

const router = express.Router();

router
  .route('/')
  .get(unitController.getAllUnits)
  .post(unitController.createUnit);

router.get('/deleted', unitController.getDeletedUnits);

router.patch('/:id/restore', validateIdParam('id'), unitController.restoreUnit);

router
  .route('/:id')
  .all(validateIdParam())
  .get(unitController.getUnitById)
  .patch(unitController.updateUnit)
  .delete(unitController.deleteUnit);

export default router;
