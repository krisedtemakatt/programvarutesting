describe('Engagera dig Button Test', () => {
  it('should navigate to the /committies page when clicked', () => {
    // Visit the home page or the page where the button is located
    cy.visit('http://localhost:5173/');

    //enter the username
    cy.get("#username").type("admin");

    //enter the password
    cy.get("#password").type("12345");

    // Find the button and click it
    cy.contains('button', 'Login').click();

    // Verify that the URL is now /committies
    cy.url().should('include', 'LoggedIn');
  });
});
