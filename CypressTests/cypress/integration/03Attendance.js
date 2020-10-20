context('Attendance', () => {
    it('Log into app', () => { cy.login() });
    it('Load attendance tab', () => { cy.loadTab('mainAttendanceTab', 'groupsBox'); });
    editCampus();
    editService();
    editServiceTime();
    attendanceChart();
});

function editCampus() {
    it('Edit Campus', () => {
        cy.get('#groupsBox a:contains("Main Campus")').should('exist').click();
        cy.get('#campusBox').should('exist');
        cy.get('#campusName').should('exist').clear().type('Main Campus Test');
        cy.get('#campusBox .footer .btn-success').click();
        cy.get('#groupsBox a:contains("Main Campus Test")').should('exist').click();
        cy.get('#campusName').should('exist').clear().type('Main Campus');
        cy.get('#campusBox .footer .btn-success').click();
        cy.wait(500);
    });
}

function editService() {
    it('Edit Service', () => {
        cy.get('#groupsBox a:contains("Sunday"):first').should('exist').click();
        cy.get('#serviceBox').should('be.visible');
        cy.wait(300);
        cy.get('#serviceBox input[name="serviceName"]').should('be.visible').clear().type('Sunday Test');
        cy.get('#serviceBox .footer .btn-success').click();
        cy.wait(500);
        cy.get('#groupsBox a:contains("Sunday Test"):first').should('be.visible').click();
        cy.wait(300);
        cy.get('#serviceBox input[name="serviceName"]').should('be.visible').clear().type('Sunday');
        cy.get('#serviceBox .footer .btn-success').click();
        cy.wait(500);
    });
}

function editServiceTime() {
    it('Edit Service Time', () => {
        cy.get('#groupsBox a:contains("10:30am"):first').should('exist').click();
        cy.get('#serviceTimeBox').should('exist');
        cy.wait(300);
        cy.get('#serviceTimeBox input[name="serviceTimeName"]').should('exist').clear().type('10:31am');
        cy.get('#serviceTimeBox .footer .btn-success').click();
        cy.wait(500);

        cy.get('#groupsBox a:contains("10:31am"):first').should('exist').click();
        cy.get('#serviceTimeBox').should('exist');
        cy.wait(300);
        cy.get('#serviceTimeBox input[name="serviceTimeName"]').should('exist').clear().type('10:30am');
        cy.get('#serviceTimeBox .footer .btn-success').click();
        cy.wait(500);
    });
}

function attendanceChart() {
    it('Chart is populated', () => { cy.get('#chartBox-attendanceTrend rect').should('exist'); });
    it('Switch to people tab', () => {
        cy.get("#attendanceTabs .nav-link:contains('Group Attendance')").should('exist').should('not.have.class', 'active').click().should('have.class', 'active');
        cy.get('#attendanceBox').should('not.be.visible');
        cy.get('#chartBox-groupAttendance').should('be.visible');
    });

    it('No people shown', () => { cy.get('#chartBox-groupAttendance').should('not.contain', 'Worship Service'); });
    it('Filter attendance', () => {
        cy.get('#filterBox-groupAttendance input[name="week"]').should('exist').clear().type('2020-06-28');
        cy.get('#filterBox-groupAttendance .footer .btn-success').click();
    });
    it('People shown', () => { cy.get('#chartBox-groupAttendance').should('contain', 'Worship Service'); });


    it('Switch to attendance tab', () => {
        cy.get("#attendanceTabs .nav-link:contains('Attendance Trend')").should('exist').should('not.have.class', 'active').click().should('have.class', 'active');
        cy.get('#chartBox-attendanceTrend').should('be.visible');
    });
    it('Attendance chart shown', () => { cy.get('#chartBox-attendanceTrend').should('exist'); });
}