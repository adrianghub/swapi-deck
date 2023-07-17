import { getAppName } from '../support/app.po';

describe('client', () => {
  beforeEach(() => cy.visit('/'));

  it('should display app name', () => {
    // Function helper example, see `../support/app.po.ts` file
    getAppName().contains('SWAPI Deck');
  });
});
