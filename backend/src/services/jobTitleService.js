import db from '../models/index.js';

const { JobTitle } = db;

export const createJobTitle = async (data) => {
  return JobTitle.create(data);
};

export const getAllJobTitles = async () => {
  return JobTitle.findAll({
    where: { is_active: true },
    order: [['created_at', 'DESC']],
  });
};

export const getJobTitleById = async (id) => {
  return JobTitle.findOne({
    where: { id, is_active: true },
  });
};

export const updateJobTitle = async (id, data) => {
  const jobTitle = await JobTitle.findOne({
    where: { id, is_active: true },
  });

  if (!jobTitle) return null;

  return jobTitle.update(data);
};

export const deleteJobTitle = async (id) => {
  const jobTitle = await JobTitle.findOne({
    where: { id, is_active: true },
  });

  if (!jobTitle) return null;

  await jobTitle.update({ is_active: false });

  return jobTitle;
};
