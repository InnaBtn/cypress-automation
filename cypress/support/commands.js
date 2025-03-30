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

Cypress.Commands.add('addExpenses', () => {
  const options = { timeZone: 'Europe/Kiev', year: 'numeric', month: '2-digit', day: '2-digit' };
  const currentDate = new Intl.DateTimeFormat('en-CA', options).format(new Date()); // Format YYYY-MM-DD

  cy.fixture('car.json').then((car) => {
    const carId = car.carId;

    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/expenses',
      body: {
        carId: carId,
        reportedAt: currentDate,
        mileage: 130,
        liters: 20,
        totalCost: 100,
        forceMileage: false
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an('object');
      expect(response.body.data).to.have.property('id');
      expect(response.body.data).to.have.property('carId').that.equals(carId);
      expect(response.body.data).to.have.property('reportedAt').that.equals(currentDate);
      expect(response.body.data).to.have.property('mileage').that.equals(130);
      expect(response.body.data).to.have.property('liters').that.equals(20);
      expect(response.body.data).to.have.property('totalCost').that.equals(100);
    })
  })
});
