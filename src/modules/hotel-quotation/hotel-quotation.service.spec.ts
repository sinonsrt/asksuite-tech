import { Test, TestingModule } from '@nestjs/testing';
import { HotelQuotationService } from './hotel-quotation.service';
import { ConfigModule } from '@nestjs/config';
import { BrowserProvider, DateProvider } from '../../utils/providers';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IHotelQuotation } from './interfaces/hotel-quotation';
import { CreateHotelQuotationDto } from './dto/create-hotel-quotation.dto';

const makeFakeHotelQuotationList = (): IHotelQuotation[] => [
  {
    name: 'valid_name',
    description: 'valid_description',
    price: 'valid_price',
    image: 'valid_image',
  },
];

const makeFakeGetHotelQuotationBody = (): CreateHotelQuotationDto => {
  return { checkin: '2023-09-24', checkout: '2023-09-27' };
};

describe('HotelQuotationService', () => {
  let sut: HotelQuotationService;
  let dateProviderStub: DateProvider;
  let browserProviderStub: BrowserProvider;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [HotelQuotationService, BrowserProvider, DateProvider],
    }).compile();

    sut = module.get<HotelQuotationService>(HotelQuotationService);
    dateProviderStub = module.get<DateProvider>(DateProvider);
    browserProviderStub = module.get<BrowserProvider>(BrowserProvider);
  }, 7000);

  test('Should throw if checkin and checkout is equal', async () => {
    const promise = sut.getHotelQuotation({
      checkin: '2023-09-25',
      checkout: '2023-09-25',
    });

    await expect(promise).rejects.toThrow(BadRequestException);
    await expect(promise).rejects.toBeInstanceOf(BadRequestException);
  });

  test('Should call dateFormat with the correct values', async () => {
    const fakeGetHotelQuotationBody = makeFakeGetHotelQuotationBody();
    const dateFormatSpy = jest.spyOn(dateProviderStub, 'dateFormat');

    await sut.getHotelQuotation(fakeGetHotelQuotationBody);

    expect(dateFormatSpy).toHaveBeenCalledWith('2023-09-24');
    expect(dateFormatSpy).toHaveBeenCalledWith('2023-09-27');
    expect(dateFormatSpy).toHaveBeenCalledTimes(2);
  }, 5000);

  test('Should call getBrowserPage only 1 times', async () => {
    const fakeGetHotelQuotationBody = makeFakeGetHotelQuotationBody();
    const getBrowserPageSpy = jest.spyOn(browserProviderStub, 'getBrowserPage');

    await sut.getHotelQuotation(fakeGetHotelQuotationBody);

    expect(getBrowserPageSpy).toHaveBeenCalledTimes(1);
  }, 5000);

  test('Should throw NotFound if any available rooms is available in the period', async () => {
    const promise = sut.getHotelQuotation({
      checkin: '2022-01-01',
      checkout: '2022-01-02',
    });

    await expect(promise).rejects.toThrow(NotFoundException);
    await expect(promise).rejects.toBeInstanceOf(NotFoundException);
  }, 5000);

  test('Should return a list of available rooms', async () => {
    const fakeGetHotelQuotationBody = makeFakeGetHotelQuotationBody();
    const hotelQuotationList = makeFakeHotelQuotationList();

    jest
      .spyOn(sut, 'getHotelQuotation')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(hotelQuotationList)),
      );

    const response = await sut.getHotelQuotation(fakeGetHotelQuotationBody);

    expect(response).toBe(hotelQuotationList);
  }, 5000);
});
