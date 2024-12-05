const user = { username: "admin", password: "12345" };

describe("portability", () => {
  describe("safari", () => {
    it("logging in should work on Safari", () => {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
        },
      });
      checkLoginWorks();
    });
  });

  describe("firefox", () => {
    it("logging in should work on Firefox", () => {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7; rv:91.0) Gecko/20100101 Firefox/91.0",
        },
      });
      checkLoginWorks();
    });
  });

  describe("edge", () => {
    it("logging in should work on Microsoft Edge", () => {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64",
        },
      });
      checkLoginWorks();
    });
  });

  describe("chrome", () => {
    it("logging in should work on Chrome", () => {
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });
      checkLoginWorks();
    });
  });

  describe("smartphone", () => {
    it("logging in should work on a smartphone", () => {
      cy.viewport(375, 667);
      // Visit the home page or the page where the button is located
      cy.visit("http://localhost:5173/", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });
      checkLoginWorks();
    });
  });
});

function checkLoginWorks() {
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
