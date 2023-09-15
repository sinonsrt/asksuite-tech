import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (error) {
      const zodError = error as ZodError;

      const errorMessage = zodError?.issues.length
        ? zodError.issues[0].message
        : 'Validation failed';

      throw new BadRequestException(errorMessage);
    }

    return value;
  }
}
