import { Injectable } from '@nestjs/common';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';
import { UpdateHotelQuotationDto } from './dto/update-hotel-quotation.dto';

@Injectable()
export class HotelQuotationService {
  create(createHotelQuotationDto: CreateHotelQuotationDto) {
    return 'This action adds a new hotelQuotation';
  }

  findAll() {
    return `This action returns all hotelQuotation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelQuotation`;
  }

  update(id: number, updateHotelQuotationDto: UpdateHotelQuotationDto) {
    return `This action updates a #${id} hotelQuotation`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelQuotation`;
  }
}
