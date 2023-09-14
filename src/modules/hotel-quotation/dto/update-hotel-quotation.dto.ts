import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelQuotationDto } from './create-hotel-quotation.dto';

export class UpdateHotelQuotationDto extends PartialType(CreateHotelQuotationDto) {}
