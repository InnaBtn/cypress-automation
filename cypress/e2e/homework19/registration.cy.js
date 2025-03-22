import registrationdata from '../../fixtures/registrationdata';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from './pages/HomePage';
import UserAccountPage from './pages/UserAccountPage';
import '../../support/commands';


describe('Registration tests.', () => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });
    });

    context('Negative tests for validation', () => {
        it('Should show error messages for empty fields', () => {
            HomePage.clickSignUpButton();
            RegistrationPage.textRegistration();
            RegistrationPage.clickUserNameInput();
            RegistrationPage.clickOut();
            RegistrationPage.nameRequired();
            RegistrationPage.userNameInputBorderColor();
            RegistrationPage.clickLastNameInput();
            RegistrationPage.clickOut();
            RegistrationPage.lastNameRequired();
            RegistrationPage.lastNameInputBorderColor();
            RegistrationPage.clickEmailInput();
            RegistrationPage.clickOut();
            RegistrationPage.emailRequired();
            RegistrationPage.emailInputBorderColor();
            RegistrationPage.clickPasswordInput();
            RegistrationPage.clickOut();
            RegistrationPage.passwordRequired();
            RegistrationPage.passwordInputBorderColor();
            RegistrationPage.clickRepeatPasswordInput();
            RegistrationPage.clickOut();
            RegistrationPage.repeatPasswordRequired();
            RegistrationPage.repeatPasswordInputBorderColor();
            RegistrationPage.disabledRegisterButton();
            RegistrationPage.crossButton();
        });

        it('Should show error message after entering invalid data', () => {
            HomePage.clickSignUpButton();
            RegistrationPage.textRegistration();
            cy.fixture('registrationdata').then((data) => {
                RegistrationPage.clickUserNameInput();
                RegistrationPage.typeUserName(data.nameTests[0].username);
                RegistrationPage.clickOut();
                RegistrationPage.invalidName();
                RegistrationPage.userNameInputBorderColor();
                RegistrationPage.clickLastNameInput();
                RegistrationPage.typeLastName(data.lastNameTests[0].lastName);
                RegistrationPage.clickOut();
                RegistrationPage.invalidLastName();
                RegistrationPage.lastNameInputBorderColor();
                RegistrationPage.clickEmailInput();
                RegistrationPage.typeEmail(data.emailTests[0].email);
                RegistrationPage.clickOut();
                RegistrationPage.invalidEmail();
                RegistrationPage.emailInputBorderColor();
                RegistrationPage.clickPasswordInput();
                RegistrationPage.typePassword(data.passwordTests[0].password);
                RegistrationPage.clickOut();
                RegistrationPage.invalidPassword();
                RegistrationPage.passwordInputBorderColor();
                RegistrationPage.clickPasswordInput();
                RegistrationPage.clearPasswordInput();
                RegistrationPage.typePassword(data.passwordTests[1].password);
                RegistrationPage.clickOut();
                RegistrationPage.invalidPassword();
                RegistrationPage.passwordInputBorderColor();
                RegistrationPage.clickPasswordInput();
                RegistrationPage.clearPasswordInput();
                RegistrationPage.typePassword(data.passwordTests[2].password);
                RegistrationPage.clickOut();
                RegistrationPage.invalidPassword();
                RegistrationPage.passwordInputBorderColor();
                RegistrationPage.clickPasswordInput();
                RegistrationPage.clearPasswordInput();
                RegistrationPage.typePassword(data.passwordTests[3].password);
                RegistrationPage.clickOut();
                RegistrationPage.invalidPassword();
                RegistrationPage.passwordInputBorderColor();
                RegistrationPage.clickPasswordInput();
                RegistrationPage.clearPasswordInput();
                RegistrationPage.typePassword(data.passwordTests[4].password);
                RegistrationPage.clickOut();
                RegistrationPage.invalidPassword();
                RegistrationPage.passwordInputBorderColor();
                RegistrationPage.clickRepeatPasswordInput();
                RegistrationPage.typeRepeatPassword(data.repeatPasswordTests[0].repeatPassword);
                RegistrationPage.clickOut();
                RegistrationPage.invalidRepeatPassword();
                RegistrationPage.repeatPasswordInputBorderColor();
                RegistrationPage.disabledRegisterButton();
                RegistrationPage.crossButton();
            })
        });

        it('Should show error messages after entering username and lastname with less than 2 characters or more than 20 characters', () => {
            HomePage.clickSignUpButton();
            RegistrationPage.textRegistration();
            cy.fixture('registrationdata').then((data) => {
                RegistrationPage.clickUserNameInput();
                RegistrationPage.typeUserName(data.nameTests[1].username);
                RegistrationPage.clickOut();
                RegistrationPage.invalidNameLength();
                RegistrationPage.userNameInputBorderColor();
                RegistrationPage.clickUserNameInput();
                RegistrationPage.clearUserNameInput();
                RegistrationPage.typeUserName(data.nameTests[2].username);
                RegistrationPage.clickOut();
                RegistrationPage.invalidNameLength();
                RegistrationPage.userNameInputBorderColor();
                RegistrationPage.clickLastNameInput();
                RegistrationPage.typeLastName(data.lastNameTests[1].lastName);
                RegistrationPage.clickOut();
                RegistrationPage.invalidLastNameLength();
                RegistrationPage.lastNameInputBorderColor();
                RegistrationPage.clickLastNameInput();
                RegistrationPage.clearLastNameInput();
                RegistrationPage.typeLastName(data.lastNameTests[2].lastName);
                RegistrationPage.clickOut();
                RegistrationPage.invalidLastNameLength();
                RegistrationPage.lastNameInputBorderColor();
                RegistrationPage.crossButton();
            })
        });

        it('Should ignore spaces in name and last name', () => { //This test will fail because there is a bug with these fields. Spaces are not ignored and function trim is not used
            HomePage.clickSignUpButton();
            RegistrationPage.textRegistration();
            cy.fixture('registrationdata').then((data) => {
                RegistrationPage.clickUserNameInput();
                RegistrationPage.typeUserName(data.nameTests[3].username);
                RegistrationPage.clickOut();
                RegistrationPage.invalidName().should('not.exist');
                RegistrationPage.clickLastNameInput();
                RegistrationPage.typeLastName(data.lastNameTests[1].lastName);
                RegistrationPage.clickOut();
                RegistrationPage.invalidLastName().should('not.exist');
                RegistrationPage.crossButton();
            })


        })

    })

    context('Successful test for new user registration and login to the account after that.', () => {
        it('New user registration', () => {
            HomePage.clickSignUpButton();
            RegistrationPage.textRegistration();

            let uniqueEmail = `innatest${Date.now()}@gmail.com`;
            Cypress.env('registeredEmail', uniqueEmail);

            cy.fixture('registrationdata').then((data) => {
                RegistrationPage.clickUserNameInput();
                RegistrationPage.typeUserName(data.nameTests[4].username);
                RegistrationPage.clickLastNameInput();
                RegistrationPage.typeLastName(data.lastNameTests[4].lastName);
                RegistrationPage.clickEmailInput();
                RegistrationPage.typeEmail(uniqueEmail);
                RegistrationPage.clickPasswordInput();
                RegistrationPage.typePassword(data.passwordTests[5].password);
                RegistrationPage.clickRepeatPasswordInput();
                RegistrationPage.typeRepeatPassword(data.repeatPasswordTests[1].repeatPassword);
                RegistrationPage.enabledRegisterButton();
                RegistrationPage.clickEnabledRegisterButton();
                UserAccountPage.userProfile();
            })
        });

        it('User should be able to log in successfully', () => {
            cy.login();
            UserAccountPage.userProfile();
        })
    });


});
    ;