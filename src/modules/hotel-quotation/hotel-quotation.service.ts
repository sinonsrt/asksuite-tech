import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';
import { IHotelQuotation } from './interfaces/hotel-quotation';
import { RoomFieldsEnum } from './enums/hotel-fields-enum';

interface IGetBrowserPage {
  page: Page;
  browser: Browser;
}

@Injectable()
export class HotelQuotationService {
  constructor(private configService: ConfigService) {}

  async getHotelQuotation({
    checkin,
    checkout,
  }: CreateHotelQuotationDto): Promise<IHotelQuotation[]> {
    const checkintr = checkin.split('-').reverse().join('-');
    const checkouttr = checkout.split('-').reverse().join('-');

    const { browser, page } = await this.getBrowserPage();

    const hotelURL = this.configService
      .get('HOTEL_URL')
      .replace('$CHECKIN_DATE', checkintr)
      .replace('$CHECKOUT_DATE', checkouttr);

    await page.goto(hotelURL);

    const hotelQuotationList = await this.getHotelQuotationList(hotelURL, page);

    if (!hotelQuotationList.length) {
      await browser.close();

      throw new NotFoundException(
        `No rooms available during the period ${checkin} - ${checkout}`,
      );
    }

    await browser.close();

    return hotelQuotationList;
  }

  private async getBrowserPage(): Promise<IGetBrowserPage> {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    return { browser, page };
  }

  private async roomAvailableValidation(
    hotelElement: ElementHandle<Element>,
  ): Promise<boolean> {
    const validationFields = [
      RoomFieldsEnum.name,
      RoomFieldsEnum.description,
      RoomFieldsEnum.price,
      RoomFieldsEnum.image,
    ];

    for await (const field of validationFields) {
      const element = await hotelElement.$(field);

      if (!element) return false;
    }

    return true;
  }

  private async getHotelQuotationList(url: string, page: Page) {
    const hotelElements = await page.$$('#tblAcomodacoes .row-quarto');
    const hotelQuotations: IHotelQuotation[] = [];

    for await (const hotelElement of hotelElements) {
      const roomAvailable = await this.roomAvailableValidation(hotelElement);

      if (roomAvailable) {
        const quotation: IHotelQuotation = {
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
    }

    return hotelQuotations;
  }
}
