describe('GameWizardNamesTab', () => {
  beforeEach(() => {
    cy.visit('/wizard/names');
  });

  it('should display the context question', () => {
    cy.get('.semi-bold-headline-medium').should(
      'contain',
      'How would you like to call your players?'
    );

    cy.getBySel('game-cards-type-tab-link').should(
      'have.class',
      'mat-mdc-tab-disabled'
    );

    cy.get('[data-cy="player-one-input"] input').should('be.focused');

    cy.get('.mat-mdc-tab-links [data-cy="game-cards-type-tab-link"]').should(
      'have.class',
      'mat-mdc-tab-disabled'
    );

    cy.get('[data-cy="next-step-button"] button').should('be.disabled');
  });

  it('should display error message when the first field is left empty', () => {
    cy.get('[data-cy="player-one-input"] input').focus();

    cy.get('[data-cy="player-one-input"] input').blur();

    cy.get('[data-cy="player-one-input"] #mat-mdc-error-0 > span').contains(
      'This field is required.'
    );

    cy.get('.mat-mdc-tab-links [data-cy="game-cards-type-tab-link"]').should(
      'have.class',
      'mat-mdc-tab-disabled'
    );

    cy.get('[data-cy="next-step-button"] button').should('be.disabled');
  });
});
