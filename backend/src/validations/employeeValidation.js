import { z } from 'zod';

const uuid = z.string().uuid('Invalid UUID');

const employeeBaseSchema = z.object({
  name_ar: z.string().trim().min(1, 'Arabic name is required'),
  name_en: z.string().trim().optional().nullable(),

  refinery_no: z.string().trim().min(1, 'Refinery number is required'),
  employee_no: z.string().trim().optional().nullable(),

  unit_id: uuid,
  job_title_id: uuid,

  employment_type: z.enum([
    'permanent',
    'contract_315',
    'daily_wage_192',
    'governorate_contract',
  ]),

  secondment_from: z.string().trim().optional().nullable(),

  work_location: z.string().trim().optional().nullable(),

  work_schedule: z.enum(['morning', 'shift']),
  shift: z.enum(['A', 'B', 'C', 'D']).optional().nullable(),

  education_level: z.string().trim().optional().nullable(),
  academic_specialization: z.string().trim().optional().nullable(),

  position: z.string().trim().optional().nullable(),

  birth_date: z.string().date().optional().nullable(),
  phone: z.string().trim().optional().nullable(),

  uniform_size: z.string().trim().optional().nullable(),
  safety_shoe_size: z.string().trim().optional().nullable(),

  hire_date: z.string().date().optional().nullable(),

  notes: z.string().trim().optional().nullable(),
});

const validateWorkScheduleAndShift = (data, ctx) => {
  if (data.work_schedule === 'shift' && !data.shift) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['shift'],
      message: 'Shift is required when work schedule is shift',
    });
  }

  if (data.work_schedule === 'morning' && data.shift) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['shift'],
      message: 'Shift must be empty when work schedule is morning',
    });
  }
};

export const createEmployeeSchema = employeeBaseSchema.superRefine(
  validateWorkScheduleAndShift,
);

export const updateEmployeeSchema = employeeBaseSchema
  .partial()
  .superRefine(validateWorkScheduleAndShift);

/** NOTES ABOUT ZOD:
 * - `superRefine` allows for custom validation logic that can access multiple fields.
 * - `partial()` makes all fields optional, useful for update operations.
 */
