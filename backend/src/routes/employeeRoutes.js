import express from 'express';

import * as employeeController from '../controllers/employeeController.js';
import validateIdParam from '../middlewares/validateIdParam.js';
import validateRequest from '../middlewares/validateRequest.js';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../validations/employeeValidation.js';

const router = express.Router();

router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post(
    validateRequest(createEmployeeSchema),
    employeeController.createEmployee,
  );

router.get('/deleted', employeeController.getDeletedEmployees);

router.patch(
  '/:id/restore',
  validateIdParam('id'),
  employeeController.restoreEmployee,
);

router
  .route('/:id')
  .all(validateIdParam('id'))
  .get(employeeController.getEmployeeById)
  .patch(
    validateRequest(updateEmployeeSchema),
    employeeController.updateEmployee,
  )
  .delete(employeeController.deleteEmployee);

export default router;
