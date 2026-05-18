import * as roleService from '../services/roleService.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import handleSuccess from '../utils/handleSuccess.js';

export const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);

  handleSuccess(res, role, 'Role created successfully', 201);
});

export const getAllRoles = catchAsync(async (req, res) => {
  const roles = await roleService.getAllRoles();

  handleSuccess(
    res,
    {
      results: roles.length,
      roles,
    },
    'Roles retrieved successfully',
  );
});

export const getRoleById = catchAsync(async (req, res, next) => {
  const role = await roleService.getRoleById(req.params.id);

  if (!role) {
    return next(new AppError('Role not found', 404));
  }

  handleSuccess(res, role, 'Role retrieved successfully');
});

export const updateRole = catchAsync(async (req, res, next) => {
  const role = await roleService.updateRole(req.params.id, req.body);

  if (!role) {
    return next(new AppError('Role not found', 404));
  }

  handleSuccess(res, role, 'Role updated successfully');
});

export const deleteRole = catchAsync(async (req, res, next) => {
  const role = await roleService.deleteRole(req.params.id);

  if (!role) {
    return next(new AppError('Role not found', 404));
  }

  handleSuccess(res, role, 'Role deleted successfully');
});
