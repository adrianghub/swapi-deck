describe('MainMenuPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the slogan', () => {
    cy.get('.regular-title-medium.slogan').should('be.visible');
  });
});
