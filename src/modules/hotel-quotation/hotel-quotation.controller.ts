import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import {
  CreateHotelQuotationDto,
  createHotelSchema,
} from './dto/create-hotel-quotation.dto';
import { ZodValidationPipe } from '../../utils/pipes/zod-validation-pipe';

@Controller()
export class HotelQuotationController {
  constructor(private readonly hotelQuotationService: HotelQuotationService) {}

  @Post('/search')
  @UsePipes(new ZodValidationPipe(createHotelSchema))
  create(@Body() createHotelQuotationDto: CreateHotelQuotationDto) {
    return this.hotelQuotationService.getHotelQuotation(
      createHotelQuotationDto,
    );
  }
}
