import z from 'zod';

export const GreetDto = z.object({
  greet: z.enum(['hello', 'hi']),
});

export type GreetDto = z.infer<typeof GreetDto>;
