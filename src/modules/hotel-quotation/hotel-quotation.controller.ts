import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';
import { UpdateHotelQuotationDto } from './dto/update-hotel-quotation.dto';

@Controller('hotel-quotation')
export class HotelQuotationController {
  constructor(private readonly hotelQuotationService: HotelQuotationService) {}

  @Post()
  create(@Body() createHotelQuotationDto: CreateHotelQuotationDto) {
    return this.hotelQuotationService.create(createHotelQuotationDto);
  }

  @Get()
  findAll() {
    return this.hotelQuotationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelQuotationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelQuotationDto: UpdateHotelQuotationDto) {
    return this.hotelQuotationService.update(+id, updateHotelQuotationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelQuotationService.remove(+id);
  }
}
