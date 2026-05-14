import express from 'express';

import * as jobTitleController from '../controllers/jobTitleController.js';
import validateIdParam from '../middlewares/validateIdParam.js';
import validateRequest from '../middlewares/validateRequest.js';
import {
  createJobTitleSchema,
  updateJobTitleSchema,
} from '../validations/jobTitleValidation.js';

const router = express.Router();

router
  .route('/')
  .get(jobTitleController.getAllJobTitles)
  .post(
    validateRequest(createJobTitleSchema),
    jobTitleController.createJobTitle,
  );

router
  .route('/:id')
  .all(validateIdParam('id'))
  .get(jobTitleController.getJobTitleById)
  .patch(
    validateRequest(updateJobTitleSchema),
    jobTitleController.updateJobTitle,
  )
  .delete(jobTitleController.deleteJobTitle);

export default router;
