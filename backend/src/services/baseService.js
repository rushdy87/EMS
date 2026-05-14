export const findActiveById = (Model, id, options = {}) => {
  return Model.findOne({
    where: {
      id,
      is_active: true,
    },
    ...options,
  });
};

export const findDeletedById = (Model, id, options = {}) => {
  return Model.findOne({
    where: {
      id,
      is_active: false,
    },
    ...options,
  });
};

export const getDeletedRecords = (Model, options = {}) => {
  return Model.findAll({
    where: {
      is_active: false,
    },
    order: [['updated_at', 'DESC']],
    ...options,
  });
};

export const softDeleteById = async (Model, id, options = {}) => {
  const record = await findActiveById(Model, id, options);

  if (!record) return null;

  await record.update({ is_active: false });

  return record;
};

export const restoreById = async (Model, id, options = {}) => {
  const record = await findDeletedById(Model, id, options);

  if (!record) return null;

  await record.update({ is_active: true });

  return record;
};
