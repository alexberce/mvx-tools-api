import { plainToClass } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PUBLIC_APP_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
