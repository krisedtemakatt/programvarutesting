const users = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "Password1" },
  { username: "user2", password: "Password2" },
];
const attempts = 1; // change to 100
describe("reliability", () => {
  it("after a failed login, the user should be able to login again.", () => {
    // Visit the home page or the page where the button is located
    cy.visit("http://localhost:5173/");

    //enter the username
    cy.get("#username").type(users[0].username);

    // Find the button and click it
    cy.contains("button", "Login").click();

    cy.url().should("not.include", "LoggedIn");

    cy.get("#password").type(`${users[0].password}`);

    cy.contains("button", "Login").click();

    cy.url().should("include", "LoggedIn");
  });

  it("logging in should behave the same way every time.", () => {
    for (let index = 0; index < attempts; index++) {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      //enter the username
      cy.get("#username").type(users[0].username);

      //enter the password
      cy.get("#password").type(users[0].password);

      // Find the button and click it
      cy.contains("button", "Login").click();

      // Verify that the URL is now /LoggedIn
      cy.url().should("include", "LoggedIn");
    }
  });
});
