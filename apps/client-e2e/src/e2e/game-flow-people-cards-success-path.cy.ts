describe('GameFlowFullSuccessPath', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the slogan', () => {
    cy.get('.regular-title-medium.slogan').should(
      'contain',
      'May the Cards Be with You!'
    );
  });

  it('should navigate to player name input page and verify input validation', () => {
    cy.getBySel('new-game-button').should('contain', 'New game').click();

    cy.url().should('include', '/game-wizard/names');

    cy.getBySel('game-cards-type-tab-link').should(
      'have.class',
      'mat-mdc-tab-disabled'
    );

    cy.getBySel('main-menu-button')
      .should('be.visible')
      .find('button')
      .should('be.visible');
    cy.getBySel('next-step-button')
      .should('be.visible')
      .find('button')
      .should('be.disabled');

    cy.getBySel('player-one-input').find('input').should('be.focused');
    cy.getBySel('player-one-input').find('input').blur();

    cy.get('#mat-mdc-error-0 > span').contains('This field is required.');

    cy.getBySel('player-one-input').find('input').focus();
    cy.getBySel('player-one-input').find('input').type('Player 1');

    cy.getBySel('next-step-button').find('button').should('be.disabled');

    cy.getBySel('player-two-input').find('input').focus();
    cy.getBySel('player-two-input').find('input').type('Player 2');

    cy.getBySel('player-two-input').find('input').should('be.focused');
    cy.getBySel('next-step-button').find('button').should('be.not.disabled');
  });

  it('should navigate to card type selection and start the game', () => {
    cy.getBySel('new-game-button').click();

    cy.getBySel('player-one-input').find('input').type('Player 1');

    cy.getBySel('player-two-input').find('input').focus();
    cy.getBySel('player-two-input').find('input').type('Player 2');

    cy.getBySel('next-step-button').click();

    cy.url().should('include', '/game-wizard/cards-type');

    cy.getBySel('game-cards-type-tab-link').should(
      'not.have.class',
      'mat-mdc-tab-disabled'
    );

    cy.getBySel('cards-type-select').find('mat-select').click();
    cy.getBySel('select-option-people').contains('People').click();

    cy.intercept('GET', 'https://swapi.dev/api/people').as('res');

    cy.getBySel('start-game-button').should('be.not.disabled').click();
    cy.url().should('include', '/game-board');

    cy.getBySel('cards-skeleton').should('be.visible');

    cy.wait('@res').its('response.statusCode').should('eq', 200);

    cy.getBySel('game-card').should('be.visible');

    cy.getBySel('cards-skeleton').should('not.exist');

    cy.get('[data-cy="game-cards"] > :nth-child(1)').click();
    cy.get('[data-cy="game-cards"] > :nth-child(6)').click();
  });
});
