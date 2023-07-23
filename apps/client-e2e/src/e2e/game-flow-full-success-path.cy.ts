describe('MainMenuPage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the slogan', () => {
    cy.get('.regular-title-medium.slogan').should(
      'contain',
      'May the Cards Be with You!'
    );
  });

  it('should display the', () => {
    cy.getBySel('new-game-button').should('contain', 'New game').click();

    cy.url().should('include', '/wizard/names');

    cy.getBySel('game-cards-type-tab-link').should(
      'have.class',
      'mat-mdc-tab-disabled'
    );

    cy.get('[data-cy="player-one-input"] input').should('be.focused');

    cy.get('[data-cy="player-one-input"] input').blur();

    cy.get('#mat-mdc-error-0 > span').contains('This field is required.');

    cy.get('[data-cy="player-one-input"] input').focus();

    cy.get('[data-cy="player-one-input"] input').type('Player 1');

    cy.get('[data-cy="next-step-button"] button').should('be.disabled');

    cy.get('[data-cy="player-two-input"] input').focus();

    cy.get('[data-cy="player-two-input"] input').type('Player 2');

    cy.get('[data-cy="player-two-input"] input').should('be.focused');

    cy.get('[data-cy="next-step-button"] button').should('be.not.disabled');

    cy.get('[data-cy="next-step-button"]').click();

    cy.url().should('include', '/wizard/cards-type');

    cy.get('.mat-mdc-tab-links [data-cy="game-cards-type-tab-link"]').should(
      'not.have.class',
      'mat-mdc-tab-disabled'
    );

    cy.get('[data-cy="cards-type-select"] mat-select').click();

    cy.getBySel('select-option-people').contains('People').click();

    cy.intercept('GET', 'https://swapi.dev/api/people').as('res');

    cy.getBySel('start-game-button').should('be.not.disabled').click();

    cy.url().should('include', '/game-board');

    cy.getBySel('cards-skeleton').should('be.visible');

    cy.wait('@res').its('response.statusCode').should('eq', 200);

    cy.getBySel('game-card').should('be.visible');

    cy.getBySel('cards-skeleton').should('not.exist');

    cy.get('.cards > :nth-child(1)').click();

    cy.get('.cards > :nth-child(6)').click();
  });
});
