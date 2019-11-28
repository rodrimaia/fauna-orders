describe('home page', () => {
  it('has static information', () => {
    cy.visit('/');
    cy.wait(500);
    cy.contains('Fauna Order')
    cy.contains('All Orders')
  })

  it('start with orders collapsed', () => {
    cy.visit('/');
    cy.wait(500);
    cy.contains('Fauna Order')
    cy.contains('All Orders')
    cy.get('.box').should('exist')
    cy.get('.table').should('not.be.visible')
  })

  it('click should expand orders ', () => {
    cy.visit('/');
    cy.wait(500);
    cy.get('.box').should('exist')
    cy.get('.box').first().click()
    cy.get('.table').should('be.visible')
    cy.contains('Ship To')
  })
})
