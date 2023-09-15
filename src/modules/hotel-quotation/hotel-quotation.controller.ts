import { Controller, Post, Body } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';

@Controller()
export class HotelQuotationController {
  constructor(private readonly hotelQuotationService: HotelQuotationService) {}

  @Post('/search')
  create(@Body() createHotelQuotationDto: CreateHotelQuotationDto) {
    return this.hotelQuotationService.getHotelQuotation(
      createHotelQuotationDto,
    );
  }
}
