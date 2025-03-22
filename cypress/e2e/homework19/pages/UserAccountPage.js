class UserAccountPage {
    userProfile() {
        return cy.get('#userNavDropdown').should('exist').and('be.visible');
    }
}

export default new UserAccountPage();
