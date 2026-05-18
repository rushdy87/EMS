import express from 'express';

import * as roleController from '../controllers/roleController.js';
import validateIdParam from '../middlewares/validateIdParam.js';
import validateRequest from '../middlewares/validateRequest.js';

import {
  createRoleSchema,
  updateRoleSchema,
} from '../validations/roleValidation.js';

const router = express.Router();

router
  .route('/')
  .get(roleController.getAllRoles)
  .post(validateRequest(createRoleSchema), roleController.createRole);

router
  .route('/:id')
  .all(validateIdParam('id'))
  .get(roleController.getRoleById)
  .patch(validateRequest(updateRoleSchema), roleController.updateRole)
  .delete(roleController.deleteRole);

export default router;
