import * as employeeService from '../services/employeeService.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';
import handleSuccess from '../utils/handleSuccess.js';

export const createEmployee = catchAsync(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);

  handleSuccess(res, employee, 'Employee created successfully', 201);
});

export const getAllEmployees = catchAsync(async (req, res) => {
  const result = await employeeService.getAllEmployees(req.query);

  handleSuccess(res, result, 'Employees retrieved successfully');
});

export const getEmployeeById = catchAsync(async (req, res, next) => {
  const employee = await employeeService.getEmployeeById(req.params.id);

  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }

  handleSuccess(res, employee, 'Employee retrieved successfully');
});

export const updateEmployee = catchAsync(async (req, res, next) => {
  const employee = await employeeService.updateEmployee(
    req.params.id,
    req.body,
  );

  if (!employee) {
    return next(new AppError('Employee not found', 404));
  }

  handleSuccess(res, employee, 'Employee updated successfully');
});

export const deleteEmployee = catchAsync(async (req, res, next) => {
  const result = await employeeService.deleteEmployee(req.params.id);

  if (!result) {
    return next(new AppError('Employee not found', 404));
  }

  handleSuccess(res, null, 'Employee deleted successfully');
});

export const getDeletedEmployees = catchAsync(async (req, res) => {
  const employees = await employeeService.getDeletedEmployees();

  handleSuccess(
    res,
    {
      results: employees.length,
      employees,
    },
    'Deleted employees retrieved successfully',
  );
});

export const restoreEmployee = catchAsync(async (req, res, next) => {
  const employee = await employeeService.restoreEmployee(req.params.id);

  if (!employee) {
    return next(new AppError('Deleted employee not found', 404));
  }

  handleSuccess(res, employee, 'Employee restored successfully');
});
