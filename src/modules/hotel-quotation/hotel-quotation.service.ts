import { Injectable } from '@nestjs/common';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';

@Injectable()
export class HotelQuotationService {
  async getHotelQuotation(
    createHotelQuotationDto: CreateHotelQuotationDto,
  ): Promise<any> {
    return 'This action adds a new hotelQuotation';
  }
}
