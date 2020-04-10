import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.main .toolbar')).getText() as Promise<string>;
  }

  getStudentFormTitle(){
    return element(by.css('app-student-form p')).getText() as Promise<string>;
  }
}
