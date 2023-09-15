import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateProvider {
  dateFormat(date: string): string {
    const fomattedDate = date.split('-').reverse().join('-');

    return fomattedDate;
  }

  validateIsEqualOrThrow(checkin: string, checkout: string): void {
    if (checkin >= checkout) {
      throw new BadRequestException(
        `The checkout date ${checkout} is later than or equal to the check-in date ${checkin}.`,
      );
    }
  }
}
