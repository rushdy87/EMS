import { Op } from 'sequelize';
import normalizeArabic from './normalizeArabic.js';

// Define the fields that can be used for filtering employees
const EMPLOYEE_FILTER_FIELDS = [
  'unit_id',
  'job_title_id',
  'employment_type',
  'secondment_from',
  'work_location',
  'work_schedule',
  'shift',
  'education_level',
  'academic_specialization',
  'position',
];

// Define the fields that can be selected when querying employees
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

// Define the fields that can be used for sorting employees
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

  // Handle search across multiple fields
  if (query.search) {
    const search = query.search.trim(); // Trim whitespace from the search term
    const normalizedSearch = normalizeArabic(search); // Normalize Arabic characters for consistent searching

    where[Op.or] = [
      {
        search_name_ar: {
          [Op.like]: `%${normalizedSearch}%`, // Use LIKE for case-insensitive search in PostgreSQL
        },
      },
      {
        name_en: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        refinery_no: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        employee_no: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        phone: {
          [Op.iLike]: `%${search}%`,
        },
      },
    ];
  }

  // Handle filtering based on allowed fields
  EMPLOYEE_FILTER_FIELDS.forEach((field) => {
    if (query[field]) {
      const values = query[field].split(',').map((value) => value.trim()); // Split the field value by comma and trim whitespace

      where[field] = values.length > 1 ? { [Op.in]: values } : values[0]; // Use IN operator for multiple values, or direct equality for a single value
    }
  });

  // Handle secondment filtering based on the is_seconded query parameter
  if (query.is_seconded === 'true') {
    where.secondment_from = {
      [Op.and]: [{ [Op.ne]: null }, { [Op.ne]: '' }],
    };
  }

  if (query.is_seconded === 'false') {
    where.secondment_from = {
      [Op.or]: [null, ''],
    };
  }

  return where;
};

export {
  EMPLOYEE_ALLOWED_FIELDS,
  EMPLOYEE_ALLOWED_SORT_FIELDS,
  buildEmployeeWhere,
};
