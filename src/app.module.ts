import { Module } from '@nestjs/common';
import { HotelQuotationModule } from './modules/hotel-quotation/hotel-quotation.module';
import { ConfigModule } from '@nestjs/config';
import { BrowserProvider, DateProvider } from './utils/providers';
import env from './config/env';

@Module({
  imports: [ConfigModule.forRoot({ load: [env] }), HotelQuotationModule],
  controllers: [],
  providers: [BrowserProvider, DateProvider],
})
export class AppModule {}
