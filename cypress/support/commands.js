import HomePage from "../e2e/homework19/pages/HomePage";
import LoginPage from "../e2e/homework19/pages/LoginPage";

Cypress.Commands.add('login', () => {

  const email = Cypress.env('registeredEmail');

  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });
  HomePage.clickLoginUpButton();
  LoginPage.clickEmailField();
  LoginPage.typeEmail(email);
  cy.fixture('registrationdata').then((data) => {
    LoginPage.clickPasswordField();
    LoginPage.typePassword(data.passwordTests[5].password);
    LoginPage.clickLoginButton();
  })
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {

    options.log = false;

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }

  return originalFn(element, text, options);
});
