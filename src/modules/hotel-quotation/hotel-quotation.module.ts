import { Module } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import { HotelQuotationController } from './hotel-quotation.controller';

@Module({
  controllers: [HotelQuotationController],
  providers: [HotelQuotationService],
})
export class HotelQuotationModule {}
