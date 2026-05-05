import * as unitService from '../services/unitService.js';

export const createUnit = async (req, res, next) => {
  try {
    const unit = await unitService.createUnit(req.body);

    res.status(201).json({
      status: 'success',
      data: unit,
      message: 'Unit created successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUnits = async (req, res, next) => {
  try {
    const units = await unitService.getAllUnits();

    res.status(200).json({
      status: 'success',
      data: units,
      message: 'Units retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const getUnitById = async (req, res, next) => {
  try {
    const unit = await unitService.getUnitById(req.params.id);

    if (!unit) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unit not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: unit,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUnit = async (req, res, next) => {
  try {
    const unit = await unitService.updateUnit(req.params.id, req.body);

    if (!unit) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unit not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: unit,
      message: 'Unit updated successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUnit = async (req, res, next) => {
  try {
    const result = await unitService.deleteUnit(req.params.id);

    if (!result) {
      return res.status(404).json({
        status: 'fail',
        message: 'Unit not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Unit deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
