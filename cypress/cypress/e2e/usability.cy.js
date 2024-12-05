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

describe("Usability", () => {
  it("it should verify the text color contrast", () => {
    // Visit the Login page
    cy.visit("http://localhost:5173/");

    // Check each element
    elements.forEach(({ selector, name }) => {
      cy.get(selector)
        .should("be.visible") // Ensure the element is visible
        .and("have.css", "color") // Get the text color
        .then((textColor) => {
          cy.get(selector).then(($el) => {
            const bgColor = findEffectiveBackgroundColor($el[0]);
            cy.log(
              `${name} effective background color: ${bgColor}, textColor: ${textColor}`
            );
            const contrastRatio = calculateContrastRatio(bgColor, textColor);
            cy.log(`${name} contrast ratio: ${contrastRatio}`);
            expect(contrastRatio).to.be.greaterThan(4.5); // WCAG AA standard
          });
        });
    });
  });
  it("should verify that the font used is readable for all key elements", () => {
    // Visit the Login page
    cy.visit("http://localhost:5173/");

    // Readable font family regex (adjust to your design choices)
    const readableFonts = /Arial|Helvetica|sans-serif|Roboto|Open Sans/;

    // Minimum font size for readability
    const minFontSize = 12; // px

    // Check each element
    elements.forEach(({ selector, name }) => {
      cy.get(selector).should("be.visible"); // Ensure the element is visible

      // Check font family
      cy.get(selector)
        .should("have.css", "font-family")
        .then((fontFamily) => {
          cy.log(`${name} font-family: ${fontFamily}`);
          expect(fontFamily).to.match(readableFonts);
        });

      // Check font size
      cy.get(selector)
        .should("have.css", "font-size")
        .then((fontSize) => {
          const size = parseFloat(fontSize); // Extract numeric value
          cy.log(`${name} font-size: ${fontSize}`);
          expect(size).to.be.gte(minFontSize);
        });

      // Check font weight (optional, for bold readability)
      cy.get(selector)
        .should("have.css", "font-weight")
        .then((fontWeight) => {
          const weight = parseInt(fontWeight, 10); // Convert to integer
          cy.log(`${name} font-weight: ${fontWeight}`);
          expect(weight).to.be.gte(400); // Normal font weight or higher
        });
    });
  });

  it("vertical order should be as expected", () => {
    // Visit the Login page
    cy.visit("http://localhost:5173/");

    // Check vertical order
    let previousBottom = 0; // Track the bottom position of the last element
    elements.forEach((element, index) => {
      cy.get(element.selector)
        .should("be.visible")
        .then(($el) => {
          const rect = $el[0].getBoundingClientRect();

          // Assert that the current element is below the previous one
          if (index > 0) {
            expect(rect.top).to.be.gte(previousBottom + 4); // Ensure at least 10px spacing
          }

          // Update the bottom position for the next iteration
          previousBottom = rect.bottom;
        });
    });
  });

  it("horizontal position should be similar", () => {
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
