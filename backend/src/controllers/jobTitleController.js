import * as jobTitleService from '../services/jobTitleService.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import handleSuccess from '../utils/handleSuccess.js';

export const createJobTitle = catchAsync(async (req, res) => {
  const jobTitle = await jobTitleService.createJobTitle(req.body);

  handleSuccess(res, jobTitle, 'Job title created successfully', 201);
});

export const getAllJobTitles = catchAsync(async (req, res) => {
  const jobTitles = await jobTitleService.getAllJobTitles();

  handleSuccess(
    res,
    {
      results: jobTitles.length,
      jobTitles,
    },
    'Job titles retrieved successfully',
  );
});

export const getJobTitleById = catchAsync(async (req, res, next) => {
  const jobTitle = await jobTitleService.getJobTitleById(req.params.id);

  if (!jobTitle) {
    return next(new AppError('Job title not found', 404));
  }

  handleSuccess(res, jobTitle, 'Job title retrieved successfully');
});

export const updateJobTitle = catchAsync(async (req, res, next) => {
  const jobTitle = await jobTitleService.updateJobTitle(
    req.params.id,
    req.body,
  );

  if (!jobTitle) {
    return next(new AppError('Job title not found', 404));
  }

  handleSuccess(res, jobTitle, 'Job title updated successfully');
});

export const deleteJobTitle = catchAsync(async (req, res, next) => {
  const result = await jobTitleService.deleteJobTitle(req.params.id);

  if (!result) {
    return next(new AppError('Job title not found', 404));
  }

  handleSuccess(res, null, 'Job title deleted successfully');
});
