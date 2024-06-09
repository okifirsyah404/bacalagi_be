import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import '../extensions/string.extension';
import { MainLogger } from '../logger/provider/main-logger.provider';

const logger = new MainLogger();

/**
 * Custom validation exception factory.
 *
 * This function will catch all validation errors and throw BadRequestException with the first error message
 *
 * @param errors
 */
export function validationExceptionFactory(errors: ValidationError[]) {
  errors.map((error) => {
    logger.error(error.constraints);

    throw new BadRequestException(
      `${
        error.constraints?.[Object.keys(error.constraints)[0]]
      }`.capitalizeFirstWord(),
    );
  });
}
