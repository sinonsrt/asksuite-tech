import { Module } from '@nestjs/common';
import { HotelQuotationModule } from './modules/hotel-quotation/hotel-quotation.module';

@Module({
  imports: [HotelQuotationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
