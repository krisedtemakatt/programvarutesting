const attempts = 3;

const users = [
  { username: "admin", password: "12345" },
  { username: "user1", password: "Password1" },
  { username: "user2", password: "Password2" },
];

const elements = [
  { selector: "#login-header", name: "Login Header" },
  { selector: "#username-label", name: "Username Label" },
  { selector: "#username", name: "Username Field" },
  { selector: "#password-label", name: "Password Label" },
  { selector: "#password", name: "Password Field" },
  { selector: "#login-button", name: "Login Button" },
];

// Function to find the effective background color
function findEffectiveBackgroundColor(element) {
  let bgColor = window.getComputedStyle(element).backgroundColor;
  while (bgColor === "rgba(0, 0, 0, 0)" && element.parentElement) {
    element = element.parentElement;
    bgColor = window.getComputedStyle(element).backgroundColor;
  }
  return bgColor !== "rgba(0, 0, 0, 0)" ? bgColor : "rgb(255, 255, 255)"; // Default to white if no background is found
}

// Revised utility function for contrast ratio
function calculateContrastRatio(bgColor, textColor) {
  const parseRGB = (color) => {
    const rgb = color.match(/\d+/g).map(Number); // Extract RGB values
    return rgb;
  };

  const getRelativeLuminance = (rgb) => {
    const [r, g, b] = rgb.map((c) => {
      const normalized = c / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // Relative luminance formula
  };

  const bgLuminance = getRelativeLuminance(parseRGB(bgColor));
  const textLuminance = getRelativeLuminance(parseRGB(textColor));

  // Contrast ratio calculation
  return (
    (Math.max(bgLuminance, textLuminance) + 0.05) /
    (Math.min(bgLuminance, textLuminance) + 0.05)
  );
}

const versions = [1, 2, 3];

versions.forEach((version) => {
  describe(`Login Page Quality v:${version}`, () => {
    describe("Functionality", () => {
      cy.config("defaultCommandTimeout", 10000);

      describe("Invalid login displays error message", () => {
        it("should display 'Invalid username or password!' for incorrect credentials", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
          cy.get("#username").type("admin");
          cy.get("#password").type("INVALID PASSWORD");
          cy.contains("button", "Login").click();
          cy.contains("Invalid username or password!")
            .should("exist")
            .and("be.visible");
        });
      });
      describe("Case sensitivity check", () => {
        it("should fail login with incorrect password case", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
          cy.get("#username").type(users[1].username);
          cy.get("#password").type(users[1].password.toUpperCase());
          cy.contains("button", "Login").click();
          cy.url().should("not.include", "LoggedIn");
        });
      });
      describe("Login with valid credentials using button", () => {
        users.forEach((user) => {
          it(`should login successfully for username: ${user.username}`, () => {
            cy.visit(`http://localhost:5173?v=${version}`);
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
            cy.visit(`http://localhost:5173?v=${version}`);
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
            cy.visit(`http://localhost:5173?v=${version}`);
            cy.get("#username").type(user.username);
            cy.contains("button", "Login").click();
            cy.url().should("not.include", "LoggedIn");
          });
        });
      });

      describe("Login with valid username and incorrect password", () => {
        users.forEach((user) => {
          it(`should not login for username: ${user.username}`, () => {
            cy.visit(`http://localhost:5173?v=${version}`);
            cy.get("#username").type(user.username);
            cy.get("#password").type("INVALID PASSWORD");
            cy.contains("button", "Login").click();
            cy.url().should("not.include", "LoggedIn");
          });
        });
      });

      describe("Invalid login displays error message", () => {
        it("should display 'Invalid username or password!' for incorrect credentials", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
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
          cy.visit(`http://localhost:5173?v=${version}`);
          cy.get("#password").type("INVALID PASSWORD");
          cy.get("#password").should("have.attr", "type", "password");
        });
      });
    });

    describe("Reliability", () => {
      describe("Retry login after a failed attempt", () => {
        it("should allow the user to login successfully after a failed login attempt", () => {
          // Visit the home page or the page where the button is located
          cy.visit(`http://localhost:5173?v=${version}`);

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
            cy.visit(`http://localhost:5173?v=${version}`);

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

    describe("Usability", () => {
      elements.forEach(({ selector, name }) => {
        describe(`Text color contrast for ${name}`, () => {
          it("should meet the WCAG AA standard for contrast ratio", () => {
            cy.visit(`http://localhost:5173?v=${version}`);
            cy.get(selector)
              .should("be.visible")
              .and("have.css", "color")
              .then((textColor) => {
                cy.get(selector).then(($el) => {
                  const bgColor = findEffectiveBackgroundColor($el[0]);
                  const contrastRatio = calculateContrastRatio(
                    bgColor,
                    textColor
                  );
                  expect(contrastRatio).to.be.greaterThan(4.5);
                });
              });
          });
        });

        describe(`Font readability for ${name}`, () => {
          it("should use a readable font family", () => {
            cy.visit(`http://localhost:5173?v=${version}`);
            cy.get(selector)
              .should("have.css", "font-family")
              .then((fontFamily) => {
                const readableFonts =
                  /Arial|Helvetica|sans-serif|Roboto|-apple-system|Open Sans|system-ui/;
                expect(fontFamily).to.match(readableFonts);
              });
          });

          it("should have a minimum font size of 12px", () => {
            cy.visit(`http://localhost:5173?v=${version}`);
            cy.get(selector)
              .should("have.css", "font-size")
              .then((fontSize) => {
                const size = parseFloat(fontSize);
                expect(size).to.be.gte(12);
              });
          });

          it("should have a sufficient font weight", () => {
            cy.visit(`http://localhost:5173?v=${version}`);
            cy.get(selector)
              .should("have.css", "font-weight")
              .then((fontWeight) => {
                const weight = parseInt(fontWeight, 10);
                expect(weight).to.be.gte(400);
              });
          });
        });
      });

      describe("Element vertical order", () => {
        it("should maintain proper vertical spacing between elements", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
          let previousBottom = 0;
          elements.forEach(({ selector }) => {
            cy.get(selector)
              .should("be.visible")
              .then(($el) => {
                const rect = $el[0].getBoundingClientRect();
                expect(rect.top).to.be.gte(previousBottom + 4);
                previousBottom = rect.bottom;
              });
          });
        });
      });

      describe("Horizontal alignment", () => {
        it("should align elements horizontally", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
          let initialX = null;
          elements.forEach(({ selector }) => {
            cy.get(selector).then(($el) => {
              const rect = $el[0].getBoundingClientRect();
              if (initialX === null) {
                initialX = rect.left;
              } else {
                expect(rect.left).to.be.closeTo(initialX, 5);
              }
            });
          });
        });
      });

      describe("Element position", () => {
        it("position should be in the center", () => {
          // Visit the Login page
          cy.visit(`http://localhost:5173?v=${version}`);

          // Check horizontal alignment
          let initialX = null;
          elements.forEach((element) => {
            cy.get(element.selector).then(($el) => {
              const rect = $el[0].getBoundingClientRect();

              // Check that the element is horizontally aligned
              if (initialX === null) {
                initialX = rect.left; // Record the initial `x` position
              } else {
                expect(rect.left).to.be.closeTo(initialX, 5); // Allow small deviation (e.g., 5px)
              }
            });
          });
        });
      });

      describe("Label usefulness", () => {
        it("should have a meaningful username label", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
          cy.get("#username-label")
            .invoke("text")
            .then((text) => {
              expect(text.toLowerCase()).to.include("user");
            });
        });

        it("should have a meaningful password label", () => {
          cy.visit(`http://localhost:5173?v=${version}`);
          cy.get("#password-label")
            .invoke("text")
            .then((text) => {
              expect(text.toLowerCase()).to.include("password");
            });
        });
      });
    });

    describe("Efficiency", () => {
      describe("login speed", () => {
        it("logging in should take less than 1 second", () => {
          // Visit the home page or the page where the button is located
          cy.visit(`http://localhost:5173?v=${version}`);

          // Record the start time

          // Enter the username
          cy.get("#username").type(users[0].username);

          // Enter the password
          cy.get("#password").type(users[0].password);

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
              expect(duration).to.be.lessThan(
                1000,
                `Login took ${duration} ms`
              );
            });
        });
      });

      describe("login simplicity", () => {
        it("verifies that the login form is simple and user-friendly", () => {
          // Visit the login page
          cy.visit(`http://localhost:5173?v=${version}`);

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
          cy.get("#username").type(users[0].username);
          cy.get("#password").type(users[0].password);
          cy.contains("button", "Login").click();

          // Verify login succeeds (e.g., by checking the URL or a success message)
          cy.url().should("include", "LoggedIn");

          // Verify no unnecessary errors or feedback
          cy.get(".error-message").should("not.exist");
        });
      });
    });
  });
});

// var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
