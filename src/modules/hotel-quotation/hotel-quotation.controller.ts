import { Controller, Post, Body } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';

@Controller('hotel-quotation')
export class HotelQuotationController {
  constructor(private readonly hotelQuotationService: HotelQuotationService) {}

  @Post()
  create(@Body() createHotelQuotationDto: CreateHotelQuotationDto) {
    return this.hotelQuotationService.getHotelQuotation(
      createHotelQuotationDto,
    );
  }
}
