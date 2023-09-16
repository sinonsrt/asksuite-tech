import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateHotelQuotationDto } from '../src/modules/hotel-quotation/dto/create-hotel-quotation.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const makeFakeGetHotelQuotationBody = (): CreateHotelQuotationDto => {
    return { checkin: '2023-09-24', checkout: '2023-09-27' };
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/search (POST)', () => {
    const fakeGetHotelQuotationBody = makeFakeGetHotelQuotationBody();

    return request(app.getHttpServer())
      .post('/search')
      .send(fakeGetHotelQuotationBody)
      .expect(200);
  }, 7000);
});
