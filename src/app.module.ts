import { Module } from '@nestjs/common';
import { HotelQuotationModule } from './modules/hotel-quotation/hotel-quotation.module';
import { ConfigModule } from '@nestjs/config';
import { BrowserProvider, DateProvider } from './utils/providers';

@Module({
  imports: [ConfigModule.forRoot(), HotelQuotationModule],
  controllers: [],
  providers: [BrowserProvider, DateProvider],
})
export class AppModule {}
