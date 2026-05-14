import db from '../models/index.js';

const { Unit } = db;

import {
  softDeleteById,
  restoreById,
  getDeletedRecords,
} from './baseService.js';

export const createUnit = async (data) => {
  return Unit.create(data);
};

export const getAllUnits = async () => {
  return Unit.findAll({
    where: {
      is_active: true,
    },
    order: [['created_at', 'DESC']],
  });
};

export const getUnitById = async (id) => {
  return Unit.findOne({
    where: {
      id,
      is_active: true,
    },
  });
};

export const updateUnit = async (id, data) => {
  const unit = await Unit.findOne({
    where: {
      id,
      is_active: true,
    },
  });

  if (!unit) return null;

  return unit.update(data);
};

export const deleteUnit = async (id) => {
  return softDeleteById(Unit, id);
};

export const restoreUnit = async (id) => {
  return restoreById(Unit, id);
};

export const getDeletedUnits = async () => {
  return getDeletedRecords(Unit);
};
