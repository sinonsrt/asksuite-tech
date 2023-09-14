import { Test, TestingModule } from '@nestjs/testing';
import { HotelQuotationService } from './hotel-quotation.service';

describe('HotelQuotationService', () => {
  let service: HotelQuotationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelQuotationService],
    }).compile();

    service = module.get<HotelQuotationService>(HotelQuotationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
