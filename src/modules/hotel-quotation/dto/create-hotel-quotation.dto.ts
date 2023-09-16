import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

const dateRegexFormat = /^\d{4}-\d{2}-\d{2}$/;

export const createHotelSchema = z
  .object({
    checkin: z.string().refine((value) => dateRegexFormat.test(value), {
      message: 'The date does not match the required format of YYYY-MM-DD',
    }),
    checkout: z.string().refine((value) => dateRegexFormat.test(value), {
      message: 'The date does not match the required format of YYYY-MM-DD',
    }),
  })
  .required();

export type CreateHotelQuotationDto = z.infer<typeof createHotelSchema>;

export class CreateHotelQuotationDtoSwagger {
  @ApiProperty({
    description: 'The check-in date in YYYY-MM-DD format',
    example: 'YYYY-MM-DD',
  })
  checkin: string;

  @ApiProperty({
    description: 'The check-out date in YYYY-MM-DD format',
    example: 'YYYY-MM-DD',
  })
  checkout: string;
}
