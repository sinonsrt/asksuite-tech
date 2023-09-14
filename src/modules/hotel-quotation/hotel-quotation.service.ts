import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';
import { HotelQuotation } from './entities/hotel-quotation.entity';

@Injectable()
export class HotelQuotationService {
  async getHotelQuotation({
    checkin,
    checkout,
  }: CreateHotelQuotationDto): Promise<HotelQuotation[]> {
    return [
      {
        name: 'string',
        description: 'string',
        price: 'string',
        image: 'string',
      },
    ];
  }
}
