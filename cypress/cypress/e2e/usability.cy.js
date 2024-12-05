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

describe("Usability Tests", () => {
  elements.forEach(({ selector, name }) => {
    describe(`Text color contrast for ${name}`, () => {
      it("should meet the WCAG AA standard for contrast ratio", () => {
        cy.visit("http://localhost:5173/");
        cy.get(selector)
          .should("be.visible")
          .and("have.css", "color")
          .then((textColor) => {
            cy.get(selector).then(($el) => {
              const bgColor = findEffectiveBackgroundColor($el[0]);
              const contrastRatio = calculateContrastRatio(bgColor, textColor);
              expect(contrastRatio).to.be.greaterThan(4.5);
            });
          });
      });
    });

    describe(`Font readability for ${name}`, () => {
      it("should use a readable font family", () => {
        cy.visit("http://localhost:5173/");
        cy.get(selector)
          .should("have.css", "font-family")
          .then((fontFamily) => {
            const readableFonts = /Arial|Helvetica|sans-serif|Roboto|Open Sans/;
            expect(fontFamily).to.match(readableFonts);
          });
      });

      it("should have a minimum font size of 12px", () => {
        cy.visit("http://localhost:5173/");
        cy.get(selector)
          .should("have.css", "font-size")
          .then((fontSize) => {
            const size = parseFloat(fontSize);
            expect(size).to.be.gte(12);
          });
      });

      it("should have a sufficient font weight", () => {
        cy.visit("http://localhost:5173/");
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
      cy.visit("http://localhost:5173/");
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
      cy.visit("http://localhost:5173/");
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
      cy.visit("http://localhost:5173/");

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
      cy.visit("http://localhost:5173/");
      cy.get("#username-label")
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.include("user");
        });
    });

    it("should have a meaningful password label", () => {
      cy.visit("http://localhost:5173/");
      cy.get("#password-label")
        .invoke("text")
        .then((text) => {
          expect(text.toLowerCase()).to.include("password");
        });
    });
  });
});
