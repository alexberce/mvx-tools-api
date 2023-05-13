import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  PUBLIC_APP_PORT: number;

  @IsString()
  MAIN_MONGO_DB_HOST: string;
  @IsString()
  MAIN_MONGO_DB_NAME: string;

  @IsString()
  SNAPSHOTS_MONGO_DB_HOST: string;
  @IsString()
  SNAPSHOTS_MONGO_DB_NAME: string;
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
