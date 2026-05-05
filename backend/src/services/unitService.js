import db from '../models/index.js';

const { Unit } = db;

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
  const unit = await Unit.findOne({
    where: {
      id,
      is_active: true,
    },
  });

  if (!unit) return null;

  await unit.update({ is_active: false });

  return unit;
};

export const restoreUnit = async (id) => {
  const unit = await Unit.findOne({
    where: {
      id,
      is_active: false,
    },
  });

  if (!unit) return null;

  await unit.update({ is_active: true });

  return unit;
};

export const getDeletedUnits = async () => {
  return Unit.findAll({
    where: {
      is_active: false,
    },
    order: [['updated_at', 'DESC']],
  });
};
