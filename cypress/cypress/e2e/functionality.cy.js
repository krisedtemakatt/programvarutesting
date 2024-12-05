const users = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "Password1" },
  { username: "user2", password: "Password2" },
];

describe("Login Functionality Tests", () => {
  describe("Login with valid credentials using button", () => {
    users.forEach((user) => {
      it(`should login successfully for username: ${user.username}`, () => {
        cy.visit("http://localhost:5173/");
        cy.get("#username").type(user.username);
        cy.get("#password").type(user.password);
        cy.contains("button", "Login").click();
        cy.url().should("include", "LoggedIn");
        cy.get("#username_tag").should("contain.text", user.username);
      });
    });
  });

  describe("Login with valid credentials using enter key", () => {
    users.forEach((user) => {
      it(`should login successfully for username: ${user.username}`, () => {
        cy.visit("http://localhost:5173/");
        cy.get("#username").type(user.username);
        cy.get("#password").type(`${user.password}{enter}`);
        cy.url().should("include", "LoggedIn");
        cy.get("#username_tag").should("contain.text", user.username);
      });
    });
  });

  describe("Login with valid username and empty password", () => {
    users.forEach((user) => {
      it(`should not login for username: ${user.username}`, () => {
        cy.visit("http://localhost:5173/");
        cy.get("#username").type(user.username);
        cy.contains("button", "Login").click();
        cy.url().should("not.include", "LoggedIn");
      });
    });
  });

  describe("Login with valid username and incorrect password", () => {
    users.forEach((user) => {
      it(`should not login for username: ${user.username}`, () => {
        cy.visit("http://localhost:5173/");
        cy.get("#username").type(user.username);
        cy.get("#password").type("INVALID PASSWORD");
        cy.contains("button", "Login").click();
        cy.url().should("not.include", "LoggedIn");
      });
    });
  });

  describe("Invalid login displays error message", () => {
    it("should display 'Invalid username or password!' for incorrect credentials", () => {
      cy.visit("http://localhost:5173/");
      cy.get("#username").type("admin");
      cy.get("#password").type("INVALID PASSWORD");
      cy.contains("button", "Login").click();
      cy.contains("Invalid username or password!")
        .should("exist")
        .and("be.visible");
    });
  });

  describe("Password field behavior", () => {
    it("should hide password input", () => {
      cy.visit("http://localhost:5173/");
      cy.get("#password").type("INVALID PASSWORD");
      cy.get("#password").should("have.attr", "type", "password");
    });
  });

  describe("Case sensitivity check", () => {
    it("should fail login with incorrect password case", () => {
      cy.visit("http://localhost:5173/");
      cy.get("#username").type(users[1].username);
      cy.get("#password").type(users[1].password.toUpperCase());
      cy.contains("button", "Login").click();
      cy.contains("Invalid username or password!")
        .should("exist")
        .and("be.visible");
      cy.url().should("not.include", "LoggedIn");
    });
  });
});
