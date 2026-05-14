import db from '../models/index.js';
import AppError from './AppError.js';

const { Unit, JobTitle } = db;

export const validateEmployeeRelations = async ({ unit_id, job_title_id }) => {
  const unit = await Unit.findOne({
    where: {
      id: unit_id,
      is_active: true,
    },
  });

  if (!unit) {
    throw new AppError('Unit not found', 400);
  }

  const jobTitle = await JobTitle.findByPk(job_title_id);

  if (!jobTitle) {
    throw new AppError('Job title not found', 400);
  }
};
