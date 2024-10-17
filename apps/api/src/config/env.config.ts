import { ConfigService, registerAs } from '@nestjs/config';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Zod schema for validating env vars
 */
export const envSchema = z.object({
  WEBSITE_URL: z.string(),
  PORT: z.coerce.number().optional(),
});

/**
 * Loads env vars and validates them
 */
export const loadEnv = registerAs('envConfig', () => {
  const parsed = envSchema.safeParse(process.env);

  if (parsed.error)
    throw new Error(
      `Environment Variables Error: ${fromZodError(parsed.error)}`,
    );

  return parsed.data;
});

/**
 * Env vars types
 */
export type EnvConfigType = z.infer<typeof envSchema>;

/**
 * Gets env value using ConfigService with type generics
 */
export const getEnvValue = <TEnvKey extends keyof EnvConfigType>(
  configService: ConfigService,
  envKey: TEnvKey,
) => configService.get(envKey) as EnvConfigType[TEnvKey];
