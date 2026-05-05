import db from '../models/index.js';

const { Unit } = db;

export const createUnit = async (unitData) => {
  return await Unit.create(unitData);
};

export const getAllUnits = async () => {
  return await Unit.findAll();
};

export const getUnitById = async (id) => {
  return await Unit.findByPk(id);
};

export const updateUnit = async (id, unitData) => {
  const unit = await Unit.findByPk(id);
  if (!unit) return null;

  return await unit.update(unitData);
};

export const deleteUnit = async (id) => {
  const unit = await Unit.findByPk(id);
  if (!unit) return null;

  await unit.destroy();
  return true;
};
