import * as unitService from '../services/unitService.js';
import catchAsync from '../utils/catchAsync.js';
import handleSuccess from '../utils/handleSuccess.js';
import AppError from '../utils/AppError.js';

export const createUnit = catchAsync(async (req, res, next) => {
  const unit = await unitService.createUnit(req.body);
  handleSuccess(res, unit, 'Unit created successfully', 201);
});

export const getAllUnits = catchAsync(async (req, res) => {
  const units = await unitService.getAllUnits();

  handleSuccess(
    res,
    {
      results: units.length,
      units,
    },
    'Units retrieved successfully',
  );
});

export const getUnitById = catchAsync(async (req, res, next) => {
  const unit = await unitService.getUnitById(req.params.id);

  if (!unit) {
    return next(new AppError('Unit not found', 404));
  }

  handleSuccess(res, unit, 'Unit retrieved successfully');
});

export const updateUnit = catchAsync(async (req, res, next) => {
  const unit = await unitService.updateUnit(req.params.id, req.body);

  if (!unit) {
    return next(new AppError('Unit not found', 404));
  }

  handleSuccess(res, unit, 'Unit updated successfully');
});

export const deleteUnit = catchAsync(async (req, res, next) => {
  const result = await unitService.deleteUnit(req.params.id);

  if (!result) {
    return next(new AppError('Unit not found', 404));
  }

  handleSuccess(res, null, 'Unit deleted successfully');
});

export const restoreUnit = catchAsync(async (req, res, next) => {
  const unit = await unitService.restoreUnit(req.params.id);

  if (!unit) {
    return next(new AppError('Deleted unit not found', 404));
  }

  handleSuccess(res, unit, 'Unit restored successfully');
});

export const getDeletedUnits = catchAsync(async (req, res) => {
  const units = await unitService.getDeletedUnits();

  handleSuccess(
    res,
    {
      results: units.length,
      units,
    },
    'Deleted units retrieved successfully',
  );
});
