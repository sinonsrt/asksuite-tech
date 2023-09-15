import { Module } from '@nestjs/common';
import { HotelQuotationService } from './hotel-quotation.service';
import { HotelQuotationController } from './hotel-quotation.controller';
import { ConfigModule } from '@nestjs/config';
import { BrowserProvider, DateProvider } from '../../utils/providers';

@Module({
  imports: [ConfigModule],
  controllers: [HotelQuotationController],
  providers: [HotelQuotationService, BrowserProvider, DateProvider],
})
export class HotelQuotationModule {}
