import express from 'express';
import * as unitController from '../controllers/unitController.js';

const router = express.Router();

router
  .route('/')
  .get(unitController.getAllUnits)
  .post(unitController.createUnit);

router
  .route('/:id')
  .get(unitController.getUnitById)
  .patch(unitController.updateUnit)
  .delete(unitController.deleteUnit);

export default router;
