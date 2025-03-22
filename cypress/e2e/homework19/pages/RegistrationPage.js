class RegistrationPage {
    textRegistration() {
        return cy.get('.modal-header').should('exist').and('be.visible')
    }

    userNameInput() {
        return cy.get('#signupName');
    }
    clickUserNameInput() {
        return cy.get('#signupName').click();
    }
    lastNameInput() {
        return cy.get('#signupLastName');
    }

    clickLastNameInput() {
        return cy.get('#signupLastName').click();
    }
    emailInput() {
        return cy.get('#signupEmail');
    }

    clickEmailInput() {
        return cy.get('#signupEmail').click();
    }
    passwordInput() {
        return cy.get('#signupPassword');
    }
    clickPasswordInput() {
        return cy.get('#signupPassword').click();
    }
    repeatPasswordInput() {
        return cy.get('#signupRepeatPassword');
    }
    clickRepeatPasswordInput() {
        return cy.get('#signupRepeatPassword').click();
    }




    disabledRegisterButton() {
        return cy.contains('button', 'Register').should('be.disabled');
    }
    enabledRegisterButton() {
        return cy.contains('button', 'Register').should('not.be.disabled');
    }
    clickEnabledRegisterButton() {
        return cy.contains('button', 'Register').click();
    }
    crossButton() {
        return cy.get('button[aria-label="Close"]').click();
    }
    clickRegisterButton() {
        this.registerButton.click();
    }
    clickOut() {
        return cy.get('.modal-header').click();
    }




    typeUserName(username) {
        this.userNameInput().type(username);
        return this;
    }

    typeLastName(lastname) {
        this.lastNameInput().type(lastname);
        return this;
    }

    typeEmail(email) {
        this.emailInput().type(email);
        return this;
    }

    typePassword(password) {
        this.passwordInput().type(password, { sensitive: true });
        return this;
    }

    typeRepeatPassword(repeatpassword) {
        this.repeatPasswordInput().type(repeatpassword, { sensitive: true });
        return this;
    }




    clearUserNameInput() {
        return cy.get('#signupName').clear();
    }
    clearLastNameInput() {
        return cy.get('#signupLastName').clear();
    }
    clearEmailInput() {
        return cy.get('#signupEmail').clear();
    }
    clearPasswordInput() {
        return cy.get('#signupPassword').clear();
    }
    clearRepeatPasswordInput() {
        return cy.get('#signupRepeatPassword').clear();
    }





    nameRequired() {
        return cy.contains('p', 'Name required').and('be.visible');
    }

    lastNameRequired() {
        return cy.contains('p', 'Last name required').and('be.visible');
    }

    emailRequired() {
        return cy.contains('p', 'Email required').and('be.visible');
    }

    passwordRequired() {
        return cy.contains('p', 'Password required').and('be.visible');
    }

    repeatPasswordRequired() {
        return cy.contains('p', 'Re-enter password required').and('be.visible');
    }



    invalidName() {
        return cy.contains('p', 'Name is invalid');
    }
    invalidLastName() {
        return cy.contains('p', 'Last name is invalid');
    }
    invalidEmail() {
        return cy.contains('p', 'Email is incorrect');
    }
    invalidPassword() {
        return cy.contains('p', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    }
    invalidRepeatPassword() {
        return cy.contains('p', 'Passwords do not match');
    }

    invalidNameLength() {
        return cy.contains('p', 'Name has to be from 2 to 20 characters long');
    }
    invalidLastNameLength() {
        return cy.contains('p', 'Last name has to be from 2 to 20 characters long');
    }



    userNameInputBorderColor() {
        return cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
    lastNameInputBorderColor() {
        return cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
    emailInputBorderColor() {
        return cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
    passwordInputBorderColor() {
        return cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
    repeatPasswordInputBorderColor() {
        return cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }

}


export default new RegistrationPage();
