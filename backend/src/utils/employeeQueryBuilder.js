import { Op } from 'sequelize';
import normalizeArabic from './normalizeArabic.js';

const EMPLOYEE_FILTER_FIELDS = [
  'unit_id',
  'job_title_id',
  'employment_type',
  'work_location',
  'work_schedule',
  'shift',
  'education_level',
  'position',
];

const EMPLOYEE_ALLOWED_FIELDS = [
  'id',
  'name_ar',
  'name_en',
  'refinery_no',
  'employee_no',
  'employment_type',
  'secondment_from',
  'education_level',
  'academic_specialization',
  'work_location',
  'work_schedule',
  'shift',
  'position',
  'birth_date',
  'phone',
  'uniform_size',
  'safety_shoe_size',
  'hire_date',
  'notes',
  'created_at',
  'updated_at',
];

const EMPLOYEE_ALLOWED_SORT_FIELDS = [
  'name_ar',
  'refinery_no',
  'employee_no',
  'created_at',
  'updated_at',
  'hire_date',
  'birth_date',
];

const buildEmployeeWhere = (query) => {
  const where = {
    is_active: true,
  };

  if (query.search) {
    const normalizedSearch = normalizeArabic(query.search);

    where.search_name_ar = {
      [Op.like]: `%${normalizedSearch}%`,
    };
  }

  EMPLOYEE_FILTER_FIELDS.forEach((field) => {
    if (query[field]) {
      where[field] = query[field];
    }
  });

  return where;
};

export {
  EMPLOYEE_ALLOWED_FIELDS,
  EMPLOYEE_ALLOWED_SORT_FIELDS,
  buildEmployeeWhere,
};
