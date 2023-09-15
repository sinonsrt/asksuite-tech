import { Module } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import { HotelQuotationController } from './hotel-quotation.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [HotelQuotationController],
  providers: [HotelQuotationService],
})
export class HotelQuotationModule {}
