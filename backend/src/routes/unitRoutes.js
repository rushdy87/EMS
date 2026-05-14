import express from 'express';
import * as unitController from '../controllers/unitController.js';
import { validateIdParam } from '../middlewares/index.js';
import validateRequest from '../middlewares/validateRequest.js';
import {
  createUnitSchema,
  updateUnitSchema,
} from '../validations/unitValidation.js';

const router = express.Router();

router
  .route('/')
  .get(unitController.getAllUnits)
  .post(validateRequest(createUnitSchema), unitController.createUnit);

router.get('/deleted', unitController.getDeletedUnits);

router.patch('/:id/restore', validateIdParam('id'), unitController.restoreUnit);

router
  .route('/:id')
  .all(validateIdParam('id'))
  .get(unitController.getUnitById)
  .patch(validateRequest(updateUnitSchema), unitController.updateUnit)
  .delete(unitController.deleteUnit);

export default router;
