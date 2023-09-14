import { Test, TestingModule } from '@nestjs/testing';
import { HotelQuotationController } from './hotel-quotation.controller';
import { HotelQuotationService } from './hotel-quotation.service';

describe('HotelQuotationController', () => {
  let controller: HotelQuotationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelQuotationController],
      providers: [HotelQuotationService],
    }).compile();

    controller = module.get<HotelQuotationController>(HotelQuotationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
