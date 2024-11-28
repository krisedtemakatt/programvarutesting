const users = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "Password1" },
  { username: "user2", password: "Password2" },
];
describe("functionality", () => {
  it("should login with a valid username and valid password when pressing button.", () => {
    for (const user of users) {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      //enter the username
      cy.get("#username").type(user.username);

      //enter the password
      cy.get("#password").type(user.password);

      // Find the button and click it
      cy.contains("button", "Login").click();

      // Verify that the URL is now /LoggedIn
      cy.url().should("include", "LoggedIn");

      // check that the element with a username tag includes the username.
      cy.get("#username_tag").should("contain.text", user.username);
    }
  });

  it("should login with a valid username and valid password when pressing enter.", () => {
    for (const user of users) {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      //enter the username
      cy.get("#username").type(user.username);

      //enter the password
      cy.get("#password").type(`${user.password}{enter}`);

      // Verify that the URL is now /LoggedIn
      cy.url().should("include", "LoggedIn");

      // check that the element with a username tag includes the username.
      cy.get("#username_tag").should("contain.text", user.username);
    }
  });

  it("should not login with a valid username and empty password.", () => {
    for (const user of users) {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      //enter the username
      cy.get("#username").type(user.username);

      // Find the button and click it
      cy.contains("button", "Login").click();

      // Verify that the URL is now /LoggedIn
      cy.url().should("not.include", "LoggedIn");
    }
  });

  it("should not login with a valid username and incorrect password.", () => {
    for (const user of users) {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/");

      //enter the username
      cy.get("#username").type(user.username);

      //enter the password
      cy.get("#password").type("INVALID PASSWORD");

      // Find the button and click it
      cy.contains("button", "Login").click();

      // Verify that the URL is now /LoggedIn
      cy.url().should("not.include", "LoggedIn");
    }
  });

  it("should display Invalid username or password!” somewhere for invalid login.	", () => {
    // Visit the home page or the page where the button is located
    cy.visit("http://localhost:5173/");

    //enter the username
    cy.get("#username").type("admin");

    //enter the password
    cy.get("#password").type("INVALID PASSWORD");

    // Find the button and click it
    cy.contains("button", "Login").click();

    // Verify that the URL is now /LoggedIn
    cy.contains("Invalid username or password!")
      .should("exist") // Ensure the element exists on the page
      .and("be.visible"); // Ensure the element is visible
  });

  it("password should be hidden", () => {
    // Visit the home page or the page where the button is located
    cy.visit("http://localhost:5173/");

    //enter the password
    cy.get("#password").type("INVALID PASSWORD");

    cy.get("#password") // Replace with the selector for your password input field
      .should("have.attr", "type", "password");
  });

  it("should be case sensitive.", () => {
    // Visit the home page or the page where the button is located
    cy.visit("http://localhost:5173/");

    //enter the username
    cy.get("#username").type(users[1].username);

    //enter the password
    cy.get("#password").type(users[1].password.toUpperCase());

    cy.contains("button", "Login").click();

    cy.contains("Invalid username or password!")
      .should("exist") // Ensure the element exists on the page
      .and("be.visible"); // Ensure the element is visible

    cy.url().should("not.include", "LoggedIn");
  });
});
