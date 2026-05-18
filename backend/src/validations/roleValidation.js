import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z.enum(['root', 'admin', 'manager', 'viewer']),
  description: z.string().trim().optional().nullable(),
});

export const updateRoleSchema = createRoleSchema.partial();
