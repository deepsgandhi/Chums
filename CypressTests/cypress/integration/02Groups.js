context("Groups", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/groups");
  });

  //   it("Create group", () => {
  //     const categoryName = "Testing";
  //     const groupName = "Cypress";

  //     cy.get("[data-cy=add-button]").should("exist").click();
  //     cy.get("[data-cy=save-button]").should("exist");
  //     cy.get("[data-cy=category-name]").should("exist").type(categoryName);
  //     cy.get("[data-cy=group-name]").should("exist").type(groupName);
  //     cy.get("[data-cy=save-button]").click();
  //     cy.get("[data-cy=content]")
  //       .should("exist")
  //       .should("contain", categoryName)
  //       .should("contain", groupName);
  //   });

  it("Delete group", () => {
    const categoryName = "To Delete";
    const name = "Test Name";
    const api_domain = Cypress.env("CHUMS_API_URL");

    cy.getCookie("jwt")
      .should("have.a.property", "value")
      .then(($token) => {
        cy.request({
          method: "POST",
          url: `${api_domain}/groups`,
          headers: {
            Authorization: `Bearer ${$token}`,
          },
          body: [{
            categoryName,
            name,
          }],
        });
      });
    cy.get(`a:contains('${name}')`).should("exist").click();
    cy.get("h1").should("exist").should("contain", name);
    cy.get("[data-cy=edit-button]").should("exist").click();
    cy.get("[data-cy=delete-button]").should("exist").click();
    cy.get("[data-cy=content]")
      .should("exist")
      .should("not.contain", categoryName)
      .should("not.contain", name);
  });

  // Cypress.Cookies.defaults({ whitelist: ['.AspNetCore.Session', '.AspNetCore.Cookies'] })
  // it('Log into app', () => { cy.loginWithUI() });
  // it('Load groups tab', () => { cy.loadTab('mainGroupsTab', 'groupsBox'); });
  // selectGroup();
  // editGroup();
  // removeAddMember();
  // switchTabs();
  // turnOffAttendance();
});

function selectGroup() {
  it("Select a group", () => {
    cy.get("a:contains('Davis')").should("exist").click();
  });
  it("Attendance not shown", () => {
    cy.get("#groupTabs")
      .should("not.contain", "Sessions")
      .should("not.contain", "Trends");
  });
}

function editGroup() {
  it("Edit Group", () => {
    cy.get("#groupDetailsBox .header .fa-pencil-alt").click();
    cy.get("#groupDetailsBox .footer .btn-success").should("exist");
    cy.wait(1000);
    cy.get('#groupDetailsBox select[name="trackAttendance"]')
      .should("exist")
      .select("Yes")
      .should("have.value", "true");
    cy.wait(1000);
    //cy.get('#trackAttendanceSelect').should('exist').select('Yes').should('have.value', 'true');

    cy.get("#groupDetailsBox .footer .btn-success").click();
    cy.get("#groupDetailsBox").should("contain", "Yes");
  });
  it("Attendance is shown", () => {
    cy.get("#groupTabs")
      .should("contain", "Sessions")
      .should("contain", "Trends");
  });
}

function removeAddMember() {
  //I've had to temporarily disable this test in order to automate the testing as a whole.
  //In the browser everything works great, but in cypress the handlePersonAdd callback in GroupMembers.tsx is not called
  //until the second you delete the member, no matter how long you wait.  In the browser it's called immediately after adding the member.
  /*
    it('Add a member', () => {
        cy.get('#personAddText').should('exist').clear().type('Joseph Rodriguez');
        cy.get('#personAddButton').click();
        cy.get('#personAddBox .text-success:first').should('exist').wait(500).click();
        cy.get("#groupMemberTable tr:contains('Joseph Rodriguez') a.text-danger").should('exist');
        cy.wait(5000);
    });

    it('Remove a member', () => {
        cy.get("#groupMemberTable tr:contains('Joseph Rodriguez') a.text-danger").should('exist').click();
        cy.get("#groupMemberTable tr:contains('Joseph Rodriguez') a.text-danger").should('not.exist');
    });
    */
}

function switchTabs() {
  it("Show sessions", () => {
    cy.get("#groupSessionsBox").should("not.be.visible");
    cy.get(".nav-link:contains('Sessions')")
      .should("exist")
      .should("not.have.class", "active")
      .click()
      .should("have.class", "active");

    cy.get("#groupSessionsBox").should("be.visible");
  });

  it("Show trends", () => {
    cy.get("#attendanceBox").should("not.be.visible");
    cy.get(".nav-link:contains('Trends')")
      .should("exist")
      .should("not.have.class", "active")
      .click()
      .should("have.class", "active");
    cy.get("#attendanceBox").should("be.visible");
  });
}

function turnOffAttendance() {
  it("Disable Attendance Tracking", () => {
    cy.get("#groupDetailsBox .header .fa-pencil-alt").click();
    cy.get("#groupDetailsBox .footer .btn-success").should("exist");
    cy.wait(1000);
    cy.get('#groupDetailsBox select[name="trackAttendance"]')
      .should("exist")
      .select("No")
      .should("have.value", "false");
    cy.wait(1000);
    //cy.get('#trackAttendanceSelect').should('exist').select('No').should('have.value', 'false');
    cy.get("#groupDetailsBox .footer .btn-success").click();
    cy.get("#groupDetailsBox").should("contain", "No");
  });
}
