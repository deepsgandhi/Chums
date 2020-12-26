context("Groups", () => {
  const api_domain = Cypress.env("CHUMS_API_URL");

  before(() => {
    cy.login();
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
        cy.request({
          method: "GET",
          url: `${api_domain}/groups`,
          headers: {
            Authorization: `Bearer ${$token}`,
          },
        })
          .its("body")
          .then((groups) => {
            groups.map(group => {
              cy.request({
                method: "DELETE",
                url: `${api_domain}/groups/${group.id}`,
                headers: {
                  Authorization: `Bearer ${$token}`
                }
              })
            })
          });
      });
  });

  beforeEach(() => {
    cy.login();
    cy.visit("/groups");
  });

  it("Create group", () => {
    const categoryName = "Testing";
    const groupName = "Cypress";

    cy.get("[data-cy=add-button]").should("exist").click();
    cy.get("[data-cy=save-button]").should("exist");
    cy.get("[data-cy=category-name]").should("exist").type(categoryName);
    cy.get("[data-cy=group-name]").should("exist").type(groupName);
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=content]")
      .should("exist")
      .should("contain", categoryName)
      .should("contain", groupName);
  });

  it("Delete group", () => {
    const group = {
      categoryName: "To Delete",
      name: "Test Name",
    };

    cy.getCookie("jwt")
      .should("have.a.property", "value")
      .then(($token) => {
        cy.createGroup($token, group);
      });
    cy.get(`a:contains('${group.name}')`).should("exist").click();
    cy.get("h1").should("exist").should("contain", group.name);
    cy.get("[data-cy=edit-button]").should("exist").click();
    cy.get("[data-cy=delete-button]").should("exist").click();
    cy.get("[data-cy=content]")
      .should("exist")
      .should("not.contain", group.categoryName)
      .should("not.contain", group.name);
  });

  it("Enable track attendance and check tabs of a group", () => {
    const group = {
      categoryName: "Attendance",
      name: "Track",
    };

    cy.getCookie("jwt")
      .should("have.a.property", "value")
      .then(($token) => {
        cy.createGroup($token, group);
      });

    cy.get(`a:contains('${group.name}')`).should("exist").click();
    cy.get("h1").should("exist").should("contain", group.name);
    cy.get("[data-cy=edit-button]").should("exist").click();
    cy.get("[data-cy=save-button]").should("exist");
    cy.get("[data-cy=select-attendance-type]")
      .should("exist")
      .select("Yes")
      .should("have.value", "true");
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=group-details-box]")
      .should("exist")
      .should("contain", "Yes");
    cy.get("[data-cy=group-tabs]")
      .should("exist")
      .should("contain", "Members")
      .should("contain", "Sessions")
      .should("contain", "Trends");
  });

  it("Add/Remove person to/from group", () => {
    const persons = [{ first: "Troye", last: "Smith" }];
    const group = {
      categoryName: "Test",
      name: "add/remove person",
    };
    const MembersTab = "Members";

    cy.getCookie("jwt")
      .should("have.a.property", "value")
      .then(($token) => {
        cy.createGroup($token, group);
        cy.createPeople($token, persons);
      });

    cy.get(`a:contains('${group.name}')`).should("exist").click();
    cy.get("h1").should("exist").should("contain", group.name);
    cy.get("[data-cy=person-search-bar]")
      .should("exist")
      .clear()
      .type(persons[0].first);
    cy.get("[data-cy=person-search-button]").should("exist").click();
    cy.get("[data-cy=add-to-list]").should("exist").click();
    cy.get(`a:contains('${MembersTab}')`)
      .should("exist")
      .should("have.class", "active");
    cy.get("[data-cy=group-members-tab] > [data-cy=content]")
      .should("exist")
      .should("contain", `${persons[0].first} ${persons[0].last}`);
    cy.get("[data-cy=remove-member-0]").should("exist").click();
    cy.get("[data-cy=group-members-tab] > [data-cy=content]")
      .should("exist")
      .should("not.contain", `${persons[0].first} ${persons[0].last}`);
  });

  it("Add Person to session", () => {
    const persons = [{ first: "Benny", last: "Beltik" }];
    const group = {
      categoryName: "Interaction",
      name: "Tabs",
    };
    // nesting is better than using async await in case of cypress as the docs suggest.
    cy.getCookie("jwt")
      .should("have.a.property", "value")
      .then(($token) => {
        cy.createGroup($token, group)
          .its("body")
          .then((groups) => {
            const groupId = groups[0].id;
            cy.createPeople($token, persons)
              .its("body")
              .then((people) => {
                const personId = people[0].id;
                cy.getPerson($token, personId)
                  .its("body")
                  .then((person) => {
                    const payload = [
                      {
                        groupId,
                        personId,
                        person: { ...person },
                      },
                    ];
                    addPersonToGroup($token, payload);
                  });
              });
          });
      });
    cy.visit("/groups");
    cy.get(`a:contains('${group.name}')`).should("exist").click();
    cy.get("h1").should("exist").should("contain", group.name);
    cy.get("[data-cy=edit-button]").should("exist").click();
    cy.get("[data-cy=save-button]").should("exist");
    cy.get("[data-cy=select-attendance-type]")
      .should("exist")
      .select("Yes")
      .should("have.value", "true");
    cy.get("[data-cy=save-button]").click();
    cy.get("[data-cy=group-details-box]")
      .should("exist")
      .should("contain", "Yes");
    cy.get("[data-cy=sessions-tab]").should("exist").click();
    cy.get("[data-cy=no-session-msg]").should("exist");
    cy.get("[data-cy=available-group-members]").should("exist");
    cy.get("[data-cy=create-new-session]").should("exist").click();
    cy.get("[data-cy=add-session-box]").should("exist");
    cy.get("[data-cy=save-button]").should("exist").click();
    cy.get("[data-cy=session-present-msg]").should("exist");
    cy.get("[data-cy=available-group-members]")
      .should("exist")
      .should("contain", `${persons[0].first} ${persons[0].last}`);
    cy.get("[data-cy=add-member-to-session]").should("exist").click();
    cy.get("[data-cy=group-session-box] > [data-cy=content]")
      .should("exist")
      .should("contain", `${persons[0].first} ${persons[0].last}`);
  });

  function addPersonToGroup($token, payload) {
    cy.request({
      method: "POST",
      url: `${api_domain}/groupmembers`,
      headers: {
        Authorization: `Bearer ${$token}`,
      },
      body: payload,
    });
  }
});
