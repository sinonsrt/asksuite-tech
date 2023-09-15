import { Module } from '@nestjs/common';
import { HotelQuotationModule } from './modules/hotel-quotation/hotel-quotation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HotelQuotationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
