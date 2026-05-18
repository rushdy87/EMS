import db from '../models/index.js';

const { Role } = db;

export const createRole = async (data) => {
  return Role.create(data);
};

export const getAllRoles = async () => {
  return Role.findAll({
    order: [['created_at', 'ASC']],
  });
};

export const getRoleById = async (id) => {
  return Role.findByPk(id);
};

export const updateRole = async (id, data) => {
  const role = await Role.findByPk(id);

  if (!role) return null;

  return role.update(data);
};

export const deleteRole = async (id) => {
  const role = await Role.findByPk(id);

  if (!role) return null;

  await role.destroy();

  return role;
};
