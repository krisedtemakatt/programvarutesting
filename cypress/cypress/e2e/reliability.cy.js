const users = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "Password1" },
  { username: "user2", password: "Password2" },
];
const attempts = 50;

describe("Reliability Tests", () => {
  describe("Retry login after a failed attempt", () => {
    it("should allow the user to login successfully after a failed login attempt", () => {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      // Enter the username
      cy.get("#username").type(users[0].username);

      // Attempt login without entering the password
      cy.contains("button", "Login").click();

      // Verify that login fails
      cy.url().should("not.include", "LoggedIn");

      // Enter the correct password and try again
      cy.get("#password").type(users[0].password);
      cy.contains("button", "Login").click();

      // Verify that login succeeds
      cy.url().should("include", "LoggedIn");
    });
  });

  describe("Consistent login behavior", () => {
    for (let index = 0; index < attempts; index++) {
      it(`should log in successfully on attempt #${index + 1}`, () => {
        // Visit the home page or the page where the button is located
        cy.visit("http://localhost:5173/");

        // Enter the username
        cy.get("#username").type(users[0].username);

        // Enter the password
        cy.get("#password").type(users[0].password);

        // Attempt login
        cy.contains("button", "Login").click();

        // Verify that login succeeds
        cy.url().should("include", "LoggedIn");
      });
    }
  });
});
