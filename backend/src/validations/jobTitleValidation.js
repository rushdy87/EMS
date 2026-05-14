import { z } from 'zod';

export const createJobTitleSchema = z.object({
  title: z.string().trim().min(1, 'Job title is required'),
  description: z.string().trim().optional().nullable(),
});

export const updateJobTitleSchema = createJobTitleSchema.partial();
