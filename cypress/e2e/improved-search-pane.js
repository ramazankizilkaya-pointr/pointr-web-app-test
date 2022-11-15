import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
let letter_List= ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let categoryCount;
let activeLetter;
let filterCount;
let filterText;

When("I open demo app in a browser", () => {
  cy.viewport(1920, 1080);
  cy.visit("/");
  cy.get("#loading").should("not.be.visible");
  cy.get("#pointr-web-ui").should("be.visible");
});

//As a web app user, I should see search input and cetegory list in the improved search pane
When("I see search box, magnify icon and placeholder are visible", function () {
  cy.get("#search-box >input")
    .should("have.attr", "placeholder", "Search For Places")
    .and("be.visible");
  cy.get('#search-box > img[alt="Search icon"]').should("be.visible");
});
Then(
  "I should verify category list is visible with {string} options inside",
  function (count_of_options) {
    cy.get("#category-list-container > .category-item")
      .should("be.visible")
      .and("have.length", count_of_options);
  }
);

//As a web app user, I should see Search Results header and directory list, When I click on Search input
When("I click on search input", function () {
  cy.get("#search-box").click();
});
Then("I should see Search Results header", function () {
  cy.get("#title-box").should("have.text", "Search Results");
});
Then("I should see letter list with 26 letters", function () {
  cy.get("#letterList").should("be.visible");
  cy.get("div#letterList > div.letter-container").should("have.length", 26);
});
Then("I should see left arrow button", function () {
  cy.get('.clickable-icon-container > img[alt="Left"]').should("be.visible");
});
Then("I should see Location dropdown", function () {
  cy.get('input[placeholder="Location"]').should("be.visible");
});
Then("I should see Filter dropdown", function () {
  cy.get('input[placeholder="Filter"]').should("be.visible");
});
Then("I should see cross icon in the search input", function () {
  cy.get('div#search-box > img[alt="Clear Search"]').should("be.visible");
});

//As a web app user, I should verify search input loses focus, When I click on cross icon inside search input
When("I wait until Search Results header appears", function () {
  cy.get("#title-box").should("be.visible").and("have.text", "Search Results");
});
When("I click on cross icon in the search input", function () {
  cy.get('div#search-box > img[alt="Clear Search"]').click();
});
Then("Search Results header should not be displayed", () => {
  cy.get("#title-box").should("not.exist");
});
Then("left arrow button should not be displayed", () => {
  cy.get('.clickable-icon-container > img[alt="Left"]').should("not.exist");
});

//As a web app user, I should be able to click on letters on letter directory and verify search results are updated accordingly
When("I wait until letter list appears", function () {
  cy.get("#letterList").should("be.visible");
  cy.get("div#letterList > div.letter-container").should("have.length", 26);
});

When("I click on each letter in order", function () {
  cy.get("#letterList > .letter-container.clickable").each(($element) => {
    cy.wrap($element)
      .click()
      .then(($element) => {
        cy.wait(500);
        cy.wrap($element).should("have.class", "active");
      });
  });
});
Then("I should verify the letter I clicked is active and selected", () => {});

//As a web app user, I should verify corresponding results are displayed, When I click on a category option from category list
When("I click on each category option in order", function () {
  cy.get("div#category-list-container > .category-item").then(($el) => {
    categoryCount = Cypress.$($el).length;
    for (let index = 1; index <= categoryCount; index++) {
      cy.xpath(
        `//div[@id='category-list-container']/div[@class= 'category-item'][${index}]`
      ).then(($el2) => {
        let categoryText = $el2.text();
        cy.wrap($el2).click();
        cy.get("#title-box")
          .should("be.visible")
          .and("have.text", categoryText);
        cy.xpath(
          "//div[@id='letterList' and count(.//div[contains(@class, 'letter-container') and contains(@class, 'clickable')])<26]"
        ).should("be.visible");
        cy.wait(500);
        cy.get('.clickable-icon-container > img[alt="Left"]').click();
      });
    }
  });
});

Then(
  "I should see the text of the clicked category in the search header",
  () => {}
);

Then(
  "I should verify relevant search results are displayed and some of the letters in the letter list are disabled",
  () => {}
);

//As a web app user, I should be able to scroll search results up and  down
When("I click on {string} from letter list", (mychar) => {
  cy.xpath(`//div[@id= 'letterList']//div[text()='${mychar}']`)
    .click()
    .then(($el) => {
      cy.wrap($el).should("have.class", "active");
      activeLetter = $el.text();
      cy.wait(500);
    });
});

When("I scroll search results {string}", (direction) => {
  if (direction == "down") {
    cy.get("#lettered-list-container > #scrollable-list").scrollTo("bottom", {
      easing: "linear",
      duration: 5000,
    });
  }
  if (direction == "up") {
    cy.get("#lettered-list-container > #scrollable-list").scrollTo("top", {
      easing: "linear",
      duration: 5000,
    });
  }
  cy.wait(500);
});

Then("I should verify the active letter is no longer {string}", (mychar) => {
  cy.xpath(`//div[@id= 'letterList']//div[text()='${mychar}']`).then(($el) => {
    cy.wrap($el).should("not.have.class", "active");
  });
});

//As a web app user, I should see setup a route modal, When I select a result from the search results
When("I click on random search result", () => {
  cy.xpath(
    `(//div[@id='scrollable-list']//div[@data-v-407f8fde and not(contains(@class, 'clickable')) and not(./div[@class='clickable-item-container-expandable'])]//h3[starts-with(text(), '${activeLetter}')])[1]`
  ).click();
});

When("I click on Directions button", () => {
  cy.xpath("//button[normalize-space(text())='Directions']").click();
});

Then("Set up a route modal should be displayed", () => {
  cy.xpath(
    "//div[@id='navigation']//div[@id='navigation-title' and text()='Set up a route']"
  ).should("be.visible");
});

//As a web app user, I should expand a search group and click on a result from the expanded group
When("I expand a search group", () => {
  cy.xpath(
    `(//div[@id='scrollable-list']//div[@data-v-407f8fde and ./div[@class='clickable-item-container-expandable']])[1]`
  ).click();
});

When("I click on random search result from the expanded search group", () => {
  cy.xpath(
    `(//div[@id='scrollable-list']//div[@data-v-407f8fde and ./div[contains(@class,'clickable-item-container-expandable') and contains(@class, 'expanded')]]//h3)[2]`
  ).click();
});

//As a web app user, I should be able to filtes the search results by location
When("I remember the number of Location Filters", function () {
  cy.xpath(
    "//div[contains(@id, 'combobox')]//div[contains(@class, 'actions')]"
  ).click();
  cy.xpath(
    "//div[@class='search-filter-container']//li[contains(@id, 'option')]"
  ).then(($el) => {
    filterCount = Cypress.$($el).length;
  });

  cy.get("#title-box")
    .click()
    .then(() => {
      cy.xpath("//ul[contains(@id, 'listbox')]").should("be.hidden");
    });
});

When("I type {string}", function (typeText) {
  cy.get("#search-box > input").type(typeText, { delay: 100 });
});

When("I filter the search results for each option in order", () => {
  for (let index = 1; index <= filterCount; index++) {
    cy.xpath(
      "//div[contains(@id, 'combobox')]//div[contains(@class, 'actions')]"
    ).click();
    cy.wait(500);
    cy.xpath(`//ul[contains(@id, 'listbox')]//li[${index}]`).then(
      ($filtered) => {
        filterText = $filtered.text();
        $filtered.click();
        cy.get(".filter-name").should("have.text", filterText);
        cy.wait(1000);
      }
    );
    cy.get('button[title="Clear Selected"]').click();
  }
});

Then("I should verify the search results are filtered", () => {});
