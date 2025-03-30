import '../../support/commands';
import ExpensesPage from '../homework20/pages/ExpensesPage';

describe('API tests to create a car', () => {

    beforeEach('Headless login', () => {
        cy.request('POST', 'https://qauto.forstudy.space/api/auth/signin', {
            email: 'jamestest@gmail.com',
            password: 'Qwerty123',
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    });


    it('Adding a car to the garage with valid data', () => {
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/cars',
            body: {
                carBrandId: 4,
                carModelId: 18,
                mileage: 122
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            cy.writeFile('cypress/fixtures/car.json', { carId: response.body.data.id });
        });
    });


    it('Initiage get request to get all user s cars and intercept it', () => {
        cy.fixture('car.json').then((car) => {
            const carId = car.carId;

            cy.request({
                method: 'GET',
                url: 'https://qauto.forstudy.space/api/cars'
            }).then((response) => {
                console.log('API Response:', response);
                cy.log('API Response:', response.body);
                expect(response.status).to.eq(200);
                expect(response.body.data).to.be.an('array');

                let createdCar = response.body.data.find((car) => car.id === carId);
                expect(createdCar).to.exist;

                if (createdCar) {
                    expect(createdCar.carBrandId).to.eq(4);
                    expect(createdCar.carModelId).to.eq(18);
                    expect(createdCar.initialMileage).to.eq(122);
                }
            });
        });
    });


    it('Adding expenses to the created car', () => {
        cy.addExpenses();
    });


    it('Should find the added car on the expenses page and verify that created expenses entity has correct test data that was used in the API test to add expenses', () => {

        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });

        ExpensesPage.clickExpensesPanelOption();
        ExpensesPage.fuelExpensesPageTitle();
        ExpensesPage.carSelectDropdown();
        ExpensesPage.selectPorschPananmeraDropdown();
        ExpensesPage.dateTitle();

        const options = { timeZone: 'Europe/Kiev', year: 'numeric', month: '2-digit', day: '2-digit' };
        const currentDate = new Intl.DateTimeFormat('en-CA', options).format(new Date()); // Format YYYY-MM-DD
        ExpensesPage.dateUpdated(currentDate);
        ExpensesPage.mileageData(130);
        ExpensesPage.litersUsedData(20);
        ExpensesPage.totalCostData(100);

    })
});
