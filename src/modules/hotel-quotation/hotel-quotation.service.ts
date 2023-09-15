import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';
import { HotelQuotation } from './interfaces/hotel-quotation';
import { RoomFieldsEnum } from './enums/hotel-fields-enum';

@Injectable()
export class HotelQuotationService {
  constructor(private configService: ConfigService) {}

  async getHotelQuotation({
    checkin,
    checkout,
  }: CreateHotelQuotationDto): Promise<HotelQuotation[]> {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    await page.goto(this.configService.get('HOTEL_BASE_URL'), {
      waitUntil: 'load',
    });

    const hotelElements = await page.$$('#tblAcomodacoes .row-quarto');

    const hotelQuotations: HotelQuotation[] = [];

    for await (const hotelElement of hotelElements) {
      const quotation: HotelQuotation = {
        name: await hotelElement.$eval(
          RoomFieldsEnum.name,
          (element) => element.textContent,
        ),
        description: await hotelElement.$eval(
          RoomFieldsEnum.description,
          (element) => element.textContent,
        ),
        price: await hotelElement.$eval(
          RoomFieldsEnum.price,
          (element) => element.textContent,
        ),
        image: await hotelElement.$eval(RoomFieldsEnum.image, (element) =>
          element.getAttribute('data-src'),
        ),
      };

      hotelQuotations.push(quotation);
    }

    if (!hotelElements.length) {
      throw new NotFoundException(
        `No rooms available during the period ${checkin} - ${checkout}`,
      );
    }

    await browser.close();

    return hotelQuotations;
  }
}
