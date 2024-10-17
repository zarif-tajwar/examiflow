import { z } from 'zod';

export const CreateProfileDto = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  gpa: z.number().min(2).max(4),
});

export type CreateProfileDto = z.infer<typeof CreateProfileDto>;
