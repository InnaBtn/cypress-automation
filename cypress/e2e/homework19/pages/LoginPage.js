class LoginPage {
    emailInput() {
        return cy.get('#signinEmail');
    }
    passwordInput() {
        return cy.get('#signinPassword');
    }



    clickEmailField() {
        return cy.get('#signinEmail').click();
    }
    clickPasswordField() {
        return cy.get('#signinPassword').click();
    }
    clickLoginButton() {
        return cy.contains('button', 'Login').click();
    }



    typeEmail(email) {
        this.emailInput().type(email);
        return this;
    }
    typePassword(password) {
        this.passwordInput().type(password, { sensitive: true });
        return this;
    }

    clickOut() {
        return cy.get('.modal-title').click();
    }
};

export default new LoginPage;
