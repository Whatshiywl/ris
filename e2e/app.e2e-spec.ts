import { RisPage } from './app.po';

describe('ris App', () => {
  let page: RisPage;

  beforeEach(() => {
    page = new RisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
