import { Controller, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import {
  CreateHotelQuotationDto,
  CreateHotelQuotationDtoSwagger,
  createHotelSchema,
} from './dto/create-hotel-quotation.dto';
import { ZodValidationPipe } from '../../utils/pipes/zod-validation-pipe';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class HotelQuotationController {
  constructor(private readonly hotelQuotationService: HotelQuotationService) {}

  @ApiBody({ type: CreateHotelQuotationDtoSwagger })
  @ApiOperation({
    summary:
      'Return a hotel quotation list from the period "checkin" and "checkout"',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  @Post('/search')
  @UsePipes(new ZodValidationPipe(createHotelSchema))
  @HttpCode(200)
  create(@Body() createHotelQuotationDto: CreateHotelQuotationDto) {
    return this.hotelQuotationService.getHotelQuotation(
      createHotelQuotationDto,
    );
  }
}
