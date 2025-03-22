class HomePage {
    signUpButton() {
        return cy.get('.hero-descriptor_btn.btn.btn-primary');
    }

    loginButton() {
        return cy.get('button.header_signin');

    }

    clickSignUpButton() {
        this.signUpButton().click();
    }

    clickLoginUpButton() {
        this.loginButton().click();
    }
};

export default new HomePage();
