import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElementHandle, Page } from 'puppeteer';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';
import { IHotelQuotation } from './interfaces/hotel-quotation';
import { RoomFieldsEnum } from './enums/hotel-fields-enum';
import { BrowserProvider, DateProvider } from '../../utils/providers';

@Injectable()
export class HotelQuotationService {
  private readonly logger = new Logger(HotelQuotationService.name);

  constructor(
    private configService: ConfigService,
    private browserProvider: BrowserProvider,
    private dateProvider: DateProvider,
  ) {}

  async getHotelQuotation({
    checkin,
    checkout,
  }: CreateHotelQuotationDto): Promise<IHotelQuotation[]> {
    this.logger.log('START getHotelQuotation SERVICE');

    this.dateProvider.validateIsDiffOrThrow(checkin, checkout);

    const formattedCheckinDate = this.dateProvider.dateFormat(checkin);
    const formattedCheckoutDate = this.dateProvider.dateFormat(checkout);

    const { browser, page } = await this.browserProvider.getBrowserPage();

    const hotelURL = this.configService
      .get('HOTEL_URL')
      .replace('{CHECKIN_DATE}', formattedCheckinDate)
      .replace('{CHECKOUT_DATE}', formattedCheckoutDate);

    this.logger.log(`GETTING OPTION FROM ${hotelURL}`);

    await page.goto(hotelURL);

    const hotelQuotationList = await this.getHotelQuotationList(page);

    if (!hotelQuotationList.length) {
      await browser.close();

      this.logger.error(`NO ROOMS AVAILABLE`);

      throw new NotFoundException(
        `No rooms available during the period ${checkin} - ${checkout}`,
      );
    }

    await browser.close();

    this.logger.log(`GET ${hotelQuotationList.length} OPTIONS`);
    this.logger.log('END getHotelQuotation SERVICE');

    return hotelQuotationList;
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

  private async getHotelQuotationList(page: Page): Promise<IHotelQuotation[]> {
    const hotelElements = await page.$$('#tblAcomodacoes .row-quarto');
    const hotelQuotations: IHotelQuotation[] = [];

    for await (const hotelElement of hotelElements) {
      const roomAvailable = await this.roomAvailableValidation(hotelElement);

      if (roomAvailable) {
        const [name, description, price, image] = await Promise.all([
          hotelElement.$eval(
            RoomFieldsEnum.name,
            (element) => element.textContent,
          ),
          hotelElement.$eval(
            RoomFieldsEnum.description,
            (element) => element.textContent,
          ),
          hotelElement.$eval(
            RoomFieldsEnum.price,
            (element) => element.textContent,
          ),
          hotelElement.$eval(RoomFieldsEnum.image, (element) =>
            element.getAttribute('data-src'),
          ),
        ]);

        const quotation: IHotelQuotation = {
          name,
          description,
          price,
          image,
        };

        hotelQuotations.push(quotation);
      }
    }

    return hotelQuotations;
  }
}
