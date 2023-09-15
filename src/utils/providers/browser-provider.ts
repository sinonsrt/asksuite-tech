import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';

interface IGetBrowserPage {
  page: Page;
  browser: Browser;
}

@Injectable()
export class BrowserProvider {
  async getBrowserPage(): Promise<IGetBrowserPage> {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    return { browser, page };
  }
}
