const HARVEY_SPECTER = {
  fullName: "Harvey Specter",
  firstName: "Harvey",
  lastName: "Specter",
};

const THOMAS_SHELBY = {
  fullName: "Thomas Shelby",
  firstName: "Thomas",
  lastName: "Shelby",
};

const TOMMY_SHELBY = {
  fullName: "Tommy Shelby",
  firstName: "Tommy",
  lastName: "Shelby",
};

const DAMON_SALVATORE = {
  fullName: "Damon Salvatore",
  firstName: "Damon",
  lastName: "Salvatore",
};

const JAMES_BOND = {
  fullName: "James Bond",
  firstName: "James",
  lastName: "Bond",
};

context("People", () => {
  it("Log into app", () => {
    cy.loginWithUI();
  });

  doCleanUp();
  createPerson(HARVEY_SPECTER.firstName, HARVEY_SPECTER.lastName);
  createPerson(THOMAS_SHELBY.firstName, THOMAS_SHELBY.lastName);
  createPerson(DAMON_SALVATORE.firstName, DAMON_SALVATORE.lastName);
  createPerson(TOMMY_SHELBY.firstName, TOMMY_SHELBY.lastName);
  createPerson(JAMES_BOND.firstName, JAMES_BOND.lastName);

  it("Search for Person", () => {
    cy.loadPerson(THOMAS_SHELBY.fullName);
  });
  verifyTabs();
  addANote();
  it("Go To People's Page", () => {
    cy.go("back");
  });
  editPerson(THOMAS_SHELBY.fullName);
  verifyPerson(THOMAS_SHELBY.fullName);
  houseHoldTests(THOMAS_SHELBY.fullName);
  mergePerson(TOMMY_SHELBY.fullName, THOMAS_SHELBY.fullName);
  fullHouseHoldAddressChange(DAMON_SALVATORE.fullName);

  deletePerson(HARVEY_SPECTER.fullName);
  deletePerson(DAMON_SALVATORE.fullName);
  deletePerson(JAMES_BOND.fullName);
  it("Delete Merged Record", () => {
    cy.get("#searchText").type(THOMAS_SHELBY.fullName);
    cy.get("#searchButton").click();
    cy.get("body").should("contain", 'Thomas "Tommy" Shelby');
    cy.get("a:contains('Thomas \"Tommy\" Shelby')").click();
    cy.get("h2").should("contain", 'Thomas "Tommy" Shelby');
    cy.get(".fa-pull-right").click();
    cy.get("#delete").should("exist");
    cy.get("#delete").click();
  });
});

function createPerson(firstName, lastName) {
  it(`Create Person: ${firstName} ${lastName}`, () => {
    cy.get("#firstName").type(firstName);
    cy.get("#lastName").type(lastName);
    cy.get("#addPersonBtn").click();
    cy.location("pathname").should('exist').should("contains", "/people/");
    cy.get("h2").should('exist').should("contain", `${firstName} ${lastName}`);  
    cy.go("back");
  });
}

function editPerson(name) {
  it("Edit Person", () => {
    cy.loadPerson(name);
    cy.get("#personDetailsBox .header .fa-pencil-alt").click();
    cy.get("#personDetailsBox .footer .btn-success").should("exist");
    cy.get('#personDetailsBox input[name="email"]')
      .clear()
      .type("thomas@chums.org");
    cy.get('#personDetailsBox select[name="gender"]').select("Male");
    cy.get('#personDetailsBox input[name="birthDate"]').type("1997-01-01");
    cy.get('#personDetailsBox select[name="membershipStatus"]').select(
      "Visitor"
    );
    cy.get('#personDetailsBox input[name="homePhone"]')
      .clear()
      .type("9876543210");
    cy.get('#personDetailsBox input[name="mobilePhone"]')
      .clear()
      .type("0123456789");
    cy.get('#personDetailsBox input[name="address1"]').clear().type("123 N");
    cy.get('#personDetailsBox input[name="address2"]')
      .clear()
      .type("North Main");
    cy.get('#personDetailsBox input[name="city"]').clear().type("Malibu");
    cy.get('#personDetailsBox select[name="state"]').select("CA");
    cy.get('#personDetailsBox input[name="zip"]').clear().type("543216");
    cy.get("#personDetailsBox .footer .btn-success").click();
    cy.go("back");
  });
}

function verifyPerson(name) {
  it("Verify Person Details", () => {
    cy.loadPerson(name);
    cy.get("#personDetailsBox")
      .should("contain", "thomas@chums.org")
      .and("contain", "Male")
      .and("contain", "years")
      .and("contain", "Visitor")
      .and("contain", "9876543210")
      // .and('contain', '0123456789')
      .and("contain", "123 N")
      .and("contain", "North Main")
      .and("contain", "Malibu")
      .and("contain", "CA")
      .and("contain", "543216");
    cy.go("back");
  });
}

function houseHoldTests(name) {
  it("Change household name", () => {
    cy.loadPerson(name);
    cy.wait(3000);
    cy.get("#householdBox .fa-pencil-alt").click();
    cy.get("#householdBox .footer .btn-success").should("exist");
    cy.get('#householdBox input[name="householdName"]')
      .clear()
      .type("Thomas Shelby's");
    cy.get("#householdBox .footer .btn-success").click();
  });
  it(`Add member to household without address change: ${HARVEY_SPECTER.fullName}`, () => {
    cy.get("#householdBox .fa-pencil-alt").click();
    cy.get("#householdBox .footer .btn-success").should("exist");
    cy.get("#householdBox .text-success").click();
    cy.get("#personAddText")
      .should("exist")
      .clear()
      .type(HARVEY_SPECTER.fullName);
    cy.get("#personAddButton").should("exist").click();
    cy.get("#householdMemberAddTable .text-success:first")
      .should("exist")
      .click();
    cy.get(".btn-secondary").should("exist").click();
    cy.get("#householdBox .footer .btn-success").click();
    cy.get("#householdMemberAddTable .text-success").should("not.exist");
    cy.get("#householdBox").should("contain", HARVEY_SPECTER.fullName);
    cy.get(`a:contains("${HARVEY_SPECTER.fullName}")`).click();
    cy.get("#personDetailsBox")
      .should("not.contain", "123 N")
      .and("not.contain", "North Main")
      .and("not.contain", "Malibu")
      .and("not.contain", "CA")
      .and("not.contain", "543216");
    cy.go("back");
  });

  it(`Add member to household without address change: ${JAMES_BOND.fullName}`, () => {
    cy.get("#householdBox .fa-pencil-alt").click();
    cy.get("#householdBox .footer .btn-success").should("exist");
    cy.get("#householdBox .text-success").click();
    cy.get("#personAddText").should("exist").clear().type(JAMES_BOND.fullName);
    cy.get("#personAddButton").should("exist").click();
    cy.get("#householdMemberAddTable .text-success:first")
      .should("exist")
      .click();
    cy.get(".btn-secondary").should("exist").click();
    cy.get("#householdBox .footer .btn-success").click();
    cy.get("#householdMemberAddTable .text-success").should("not.exist");
    cy.get("#householdBox").should("contain", JAMES_BOND.fullName);
    cy.get(`a:contains("${JAMES_BOND.fullName}")`).click();
    cy.get("#personDetailsBox")
      .should("not.contain", "123 N")
      .and("not.contain", "North Main")
      .and("not.contain", "Malibu")
      .and("not.contain", "CA")
      .and("not.contain", "543216");
    cy.go("back");
  });

  it("Add member to household and change its address", () => {
    cy.get("#householdBox .fa-pencil-alt").click();
    cy.get("#householdBox .footer .btn-success").should("exist");
    cy.get("#householdBox .text-success").click();
    cy.get("#personAddText")
      .should("exist")
      .clear()
      .type(DAMON_SALVATORE.fullName);
    cy.get("#personAddButton").click();
    cy.get("#householdMemberAddTable .text-success:first")
      .should("exist")
      .click();
    cy.get(".modal-footer > .btn-primary").should("exist").click();
    cy.wait(3000);
    cy.get("#householdBox .footer .btn-success").click();
    cy.get("#householdMemberAddTable .text-success").should("not.exist");
    cy.get("#householdBox").should("contain", DAMON_SALVATORE.fullName);
    cy.get(`a:contains("${DAMON_SALVATORE.fullName}")`).click();
    cy.get("#personDetailsBox")
      .should("contain", "123 N")
      .and("contain", "North Main")
      .and("contain", "Malibu")
      .and("contain", "CA")
      .and("contain", "543216");
    cy.get("#mainPeopleTab > .nav-link").click();
  });
}

function mergePerson(name, toMergeWith) {
  it("Merge Person", () => {
    cy.loadPerson(name);
    cy.get("#personDetailsBox .header .fa-pencil-alt").click();
    cy.get("#personDetailsBox .footer .btn-success").should("exist");
    cy.get('#personDetailsBox input[name="nickName"]')
      .should("exist")
      .clear()
      .type("Tommy");
    cy.get('#personDetailsBox input[name="address1"]')
      .should("exist")
      .clear()
      .type("496 Z");
    cy.get('#personDetailsBox input[name="address2"]')
      .should("exist")
      .clear()
      .type("Opposite Trick Park");
    cy.get('#personDetailsBox input[name="city"]')
      .should("exist")
      .clear()
      .type("Los Angeles");
    cy.get('#personDetailsBox input[name="zip"]')
      .should("exist")
      .clear()
      .type("92701");
    cy.get("#personDetailsBox .footer .btn-success").click();
    cy.get("#personDetailsBox .header .fa-pencil-alt").should("exist").click();
    cy.get("#personDetailsBox .footer .btn-success").should("exist");
    cy.get("#mergeButton").click();
    cy.get("#mergeBox .footer .btn-success").should("exist");
    cy.get("#searchInput").should("exist").clear().type(toMergeWith);
    cy.get("#searchButton").click();
    cy.get(".text-success").should("exist").click();
    cy.get(".modal-footer > .btn-success").should('exist');
    cy.get(".col-sm-10 > :nth-child(2) > .form-check-input").check();
    cy.get(".modal-footer > .btn-success").click();
    cy.wait(8000);
  });

  it("Verify Merged Record", () => {
    cy.get("#searchText").type(THOMAS_SHELBY.fullName);
    cy.get("#searchButton").click();
    cy.get("body").should("contain", 'Thomas "Tommy" Shelby');
    cy.get("a:contains('Thomas \"Tommy\" Shelby')").click();
    cy.get("h2").should("contain", 'Thomas "Tommy" Shelby');
    cy.get("#personDetailsBox")
      .should("contain", "thomas@chums.org")
      .and("contain", "Male")
      .and("contain", "years")
      .and("contain", "Visitor")
      .and("contain", "9876543210")
      .and("contain", "123 N")
      .and("contain", "North Main")
      .and("contain", "Malibu")
      .and("contain", "CA")
      .and("contain", "543216");
    cy.get('#notesBox p:contains("This is a test note")').should("exist");
    cy.get("#householdBox")
      .should("contain", DAMON_SALVATORE.fullName)
      .and("contain", HARVEY_SPECTER.fullName);
    cy.get("#mainPeopleTab > .nav-link").click();
  });
}

function fullHouseHoldAddressChange(name) {
  const address1 = "9673 TN";
  const address2 = "besides lane";

  const check2Address1 = "12 LLC";
  const check2Address2 = "Bay Area";
  const testCity = "San Jose";

  const checkingAgainst = HARVEY_SPECTER.fullName;

  it("Change Address of all household members on changing address of one member", () => {
    cy.loadPerson(name);
    cy.get("#personDetailsBox .header .fa-pencil-alt").click();
    cy.get("#personDetailsBox .footer .btn-success").should("exist");
    cy.get('#personDetailsBox input[name="address1"]')
      .should("exist")
      .clear()
      .type(check2Address1);
    cy.get('#personDetailsBox input[name="address2"]')
      .should("exist")
      .clear()
      .type(check2Address2);
    cy.get('#personDetailsBox input[name="city"]')
      .should("exist")
      .clear()
      .type(testCity);
    cy.get("#personDetailsBox .footer .btn-success").click();
    cy.get(".modal-content").should("exist");
    cy.get(".modal-footer > .btn-primary").should("exist").click();
    cy.get("#personDetailsBox")
      .should("contain", check2Address1)
      .and("contain", check2Address2)
      .and("contain", testCity);
    cy.get(`a:contains("${checkingAgainst}")`).click();
    cy.get("h2").should("contain", checkingAgainst);
    cy.get("#personDetailsBox")
      .should("contain", check2Address1)
      .and("contain", check2Address2)
      .and("contain", testCity)
      .and("contain", "CA")
      .and("contain", "543216");
    cy.get("#mainPeopleTab > .nav-link").click();
  });

  it("Verify change in address causes change in address only for that person", () => {
    cy.loadPerson(JAMES_BOND.fullName);
    cy.get("#personDetailsBox .header .fa-pencil-alt").click();
    cy.get("#personDetailsBox .footer .btn-success").should("exist");
    cy.wait(250);
    cy.get('#personDetailsBox input[name="address1"]')
      .should("exist")
      .clear()
      .type(address1);
    cy.wait(250);
    cy.get('#personDetailsBox input[name="address2"]')
      .should("exist")
      .clear()
      .type(address2);
    cy.get("#personDetailsBox .footer .btn-success").click();
    cy.get(".modal-content").should("exist");
    cy.get(".btn-secondary").should("exist").click();
    cy.get("#personDetailsBox")
      .should("contain", address1)
      .and("contain", address2);
    cy.get(`a:contains("${checkingAgainst}")`).click();
    cy.get("h2").should("contain", checkingAgainst);
    cy.get("#personDetailsBox")
      .should("not.contain", address1)
      .and("not.contain", address2);
    cy.get("#mainPeopleTab > .nav-link").click();
  });
}

function addANote() {
  const noteText = 'This is a test note'
  it("Add a Note", () => {
    cy.get('#notesBox').should('exist')
    cy.get("#notesBox textarea").should('exist').type(noteText);
    cy.get("#notesBox .footer .btn-success").click();
    cy.get(`#notesBox p:contains(${noteText})`, {timeout: 10000}).should("exist");
    cy.get("#notesBox textarea").should("have.value", "");
  });
}

function deletePerson(fullName) {
  it(`Delete: ${fullName}`, () => {
    cy.loadPerson(fullName);
    cy.get(".fa-pull-right").click();
    cy.get("#delete").should("exist");
    cy.get("#delete").click();
  });
}

function verifyTabs() {
  it("Verify Tabs", () => {
    cy.get("body")
      .should("contain", "Notes")
      .should("contain", "Attendance")
      .should("contain", "Donations");
  });
}

function doCleanUp() {
  it("Clean up", () => {
    cy.login();
    cy.visit("/people");
    cy.getCookie("jwt")
      .should("have.a.property", "value")
      .then(($token) => {
        const api_domain = Cypress.env("CHUMS_API_URL");
        cy.request({
          method: "GET",
          url: `${api_domain}/people/search?term=`,  
          headers: {
            Authorization: `Bearer ${$token}`,
          },
        })
          .its("body")
          .then((val) => {
            val.map((e) => {
              if (e.name.display !== "Pranav Cypress") {
                cy.request({
                  method: "DELETE",
                  url: `${api_domain}/people/${e.id}`,                 
                  headers: {
                    Authorization: `Bearer ${$token}`,
                  },
                });
              }
            });
          });
      });
  });
}
