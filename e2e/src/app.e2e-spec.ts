import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Student-App E2E test cases', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Secureworks coding sample using Angular Elements');
  });

  it('should show student entry form',() =>{
    page.navigateTo();
    expect(page.getStudentFormTitle()).toEqual('Student Entry Form');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
