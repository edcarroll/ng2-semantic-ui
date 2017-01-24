import { Ng2SemanticUiPage } from './app.po';

describe('ng2-semantic-ui App', function() {
  let page: Ng2SemanticUiPage;

  beforeEach(() => {
    page = new Ng2SemanticUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
