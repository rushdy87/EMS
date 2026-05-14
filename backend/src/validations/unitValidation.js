import { z } from 'zod';

export const createUnitSchema = z.object({
  name: z.string().trim().min(1, 'Unit name is required'),
  description: z.string().trim().optional().nullable(),
});

export const updateUnitSchema = createUnitSchema.partial();
