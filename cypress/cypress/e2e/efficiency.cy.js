const user = { username: "user1", password: "Password1" };

describe("efficiency", () => {
  describe("login speed", () => {
    it("logging in should take less than 1 second", () => {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      // Record the start time

      // Enter the username
      cy.get("#username").type(user.username);

      // Enter the password
      cy.get("#password").type(user.password);

      const startTime = performance.now();
      // Find the button and click it
      cy.contains("button", "Login").click();

      // Verify that the URL is now /LoggedIn and calculate time
      cy.url()
        .should("include", "LoggedIn")
        .then(() => {
          const endTime = performance.now();
          const duration = endTime - startTime;

          // Assert that the duration is less than 1000 milliseconds
          expect(duration).to.be.lessThan(1000, `Login took ${duration} ms`);
        });
    });
  });

  describe("login simplicity", () => {
    it("verifies that the login form is simple and user-friendly", () => {
      // Visit the login page
      cy.visit("http://localhost:5173/");

      // Check that only username and password fields are present
      cy.get("input[type='text']").should("exist");
      cy.get("input[type='password']").should("exist");
      cy.get("form input").should("have.length", 2);

      // Check for helpful labels or placeholders
      cy.get("#username")
        .should("have.attr", "placeholder")
        .and("not.be.empty");
      cy.get("#password")
        .should("have.attr", "placeholder")
        .and("not.be.empty");

      // Ensure a single button is available for submission
      cy.contains("button", "Login").should("exist");

      // Test the login flow with valid credentials
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.contains("button", "Login").click();

      // Verify login succeeds (e.g., by checking the URL or a success message)
      cy.url().should("include", "LoggedIn");

      // Verify no unnecessary errors or feedback
      cy.get(".error-message").should("not.exist");
    });
  });
});
