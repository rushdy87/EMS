import express from 'express';

import * as jobTitleController from '../controllers/jobTitleController.js';
import validateIdParam from '../middlewares/validateIdParam.js';

const router = express.Router();

router
  .route('/')
  .get(jobTitleController.getAllJobTitles)
  .post(jobTitleController.createJobTitle);

router
  .route('/:id')
  .all(validateIdParam('id'))
  .get(jobTitleController.getJobTitleById)
  .patch(jobTitleController.updateJobTitle)
  .delete(jobTitleController.deleteJobTitle);

export default router;
