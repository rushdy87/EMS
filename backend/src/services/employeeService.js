import db from '../models/index.js';
import normalizeArabic from '../utils/normalizeArabic.js';

import {
  parseFields,
  parseSort,
  parsePagination,
} from '../utils/queryFeatures.js';

import {
  EMPLOYEE_ALLOWED_FIELDS,
  EMPLOYEE_ALLOWED_SORT_FIELDS,
  buildEmployeeWhere,
} from '../utils/employeeQueryBuilder.js';
import { validateEmployeeRelations } from '../utils/employeeValidators.js';

const { Employee, Unit, JobTitle } = db;

// Define the associations to include related Unit and JobTitle data when fetching employees
// This array specifies the related models to include in employee queries, along with the attributes
// to select from those models.
const employeeIncludes = [
  {
    model: Unit,
    as: 'unit',
    attributes: ['id', 'name'],
  },
  {
    model: JobTitle,
    as: 'jobTitle',
    attributes: ['id', 'title'],
  },
];

export const createEmployee = async (data) => {
  await validateEmployeeRelations(data);

  const payload = {
    ...data,
    search_name_ar: normalizeArabic(data.name_ar),
  };

  return Employee.create(payload);
};

export const getAllEmployees = async (query) => {
  //1. Build the 'where' clause based on the query parameters using the buildEmployeeWhere function.
  const where = buildEmployeeWhere(query);

  //2. Parse the 'fields' query parameter to determine which fields to include in the response, ensuring they are valid based on the EMPLOYEE_ALLOWED_FIELDS list.
  const attributes = parseFields(query.fields, EMPLOYEE_ALLOWED_FIELDS);

  //3. Parse the 'sort' query parameter to determine the sorting order of the results, ensuring the sort fields are valid based on the EMPLOYEE_ALLOWED_SORT_FIELDS list. If no valid sort fields are provided, default to sorting by 'created_at' in descending order.
  const order = parseSort(query.sort, EMPLOYEE_ALLOWED_SORT_FIELDS, [
    ['created_at', 'DESC'],
  ]);

  //4. Parse the 'page' and 'limit' query parameters to determine pagination settings, ensuring the page number is at least 1 and the limit is between 1 and 100.
  const { page, limit, offset } = parsePagination(query.page, query.limit);

  const result = await Employee.findAndCountAll({
    where,
    attributes,
    order,
    limit,
    offset,
    include: employeeIncludes,
  });

  return {
    total: result.count,
    page,
    pages: Math.ceil(result.count / limit),
    results: result.rows.length,
    employees: result.rows,
  };
};

export const getEmployeeById = async (id) => {
  return Employee.findOne({
    where: {
      id,
      is_active: true,
    },
    include: employeeIncludes,
  });
};

export const updateEmployee = async (id, data) => {
  const employee = await Employee.findOne({
    where: {
      id,
      is_active: true,
    },
  });

  if (!employee) return null;

  if (data.unit_id || data.job_title_id) {
    await validateEmployeeRelations({
      unit_id: data.unit_id || employee.unit_id,
      job_title_id: data.job_title_id || employee.job_title_id,
    });
  }

  const payload = { ...data };

  if (data.name_ar) {
    payload.search_name_ar = normalizeArabic(data.name_ar);
  }

  return employee.update(payload);
};

export const deleteEmployee = async (id) => {
  const employee = await Employee.findOne({
    where: {
      id,
      is_active: true,
    },
  });

  if (!employee) return null;

  await employee.update({ is_active: false });

  return employee;
};

export const getDeletedEmployees = async () => {
  return Employee.findAll({
    where: { is_active: false },
    include: employeeIncludes,
    order: [['updated_at', 'DESC']],
  });
};

export const restoreEmployee = async (id) => {
  const employee = await Employee.findOne({
    where: {
      id,
      is_active: false,
    },
  });

  if (!employee) return null;

  await employee.update({ is_active: true });

  return employee;
};
