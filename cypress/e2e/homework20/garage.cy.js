import GaragePage from './pages/GaragePage';
import ExpensesPage from './pages/ExpensesPage';

// Using data from configfiles for email and password



function getFormattedDate(offsetDays = 0) { //Function to get the correct date to pass tests with the date field due to the differance in time time zones
    let date = new Date();
    date.setDate(date.getDate() + offsetDays); // Add/subtract days

    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

let yesterday = getFormattedDate(0);
let today = getFormattedDate(1);
let tomorrow = getFormattedDate(2);

describe('Tests to add a car to the garage and to ad expenses for the added car', () => {

    beforeEach(() => {
        cy.visit(Cypress.config('baseUrl'), {
            auth: Cypress.config('auth') // Using auth з from config file
        });
        cy.get('button.header_signin').click();
        cy.get('#signinEmail').type(Cypress.env('email'));  // email from env
        cy.get('#signinPassword').type(Cypress.env('password')); // password from env
        cy.contains('button', 'Login').click();
    });

    context('Adding a car to the garage', () => {
        it('Negative tests with Mileage field to verify validation and error messages', () => {
            GaragePage.clickAddCarButton();
            GaragePage.clickMileageField();
            GaragePage.clickOut();
            GaragePage.mileageRequiredMessage();
            GaragePage.mileageFieldBoderColor();
            GaragePage.disabledAddButton();
            GaragePage.typeMileage(1000000);
            GaragePage.clickOut();
            GaragePage.mileageValidationMessage();
            GaragePage.mileageFieldBoderColor();
            GaragePage.disabledAddButton();
        });
        it('Clicking Cancel button after entering valid data should close the Add Car window', () => {
            GaragePage.clickAddCarButton();
            GaragePage.typeMileage(50);
            GaragePage.clickCancelButton();
            GaragePage.noCarsEddedMessage();
        });
        it('Adding a car to the garage with valid data', () => {
            GaragePage.clickAddCarButton();
            GaragePage.addCarTitle();
            GaragePage.selectOptionPorscheToAddCar();
            GaragePage.selecktOptionPanameraToAddCar();
            GaragePage.typeMileage(100);
            GaragePage.clickAddButton();
            GaragePage.garageTitle();
            GaragePage.porscheIcon();
            GaragePage.updateMileageTitle();
            GaragePage.mileageIcon();
            GaragePage.mileageInput();
            GaragePage.updateMileageButton();
            GaragePage.editCarButton();
            GaragePage.addFuelExpensesButton();

        });
    });
    context('Adding expenses for an added car', () => {
        it('Negative tests to verify validation of the Report Date field and error messages', () => {
            GaragePage.clickAddFuelExpensesButton();
            ExpensesPage.clickDateField();
            ExpensesPage.clearDateField();
            ExpensesPage.typeCurrentDate(tomorrow);
            ExpensesPage.clearMileageField();
            ExpensesPage.typeMileage(152);
            ExpensesPage.typeLiters(100);
            ExpensesPage.typeTotalCost(120);
            ExpensesPage.clickAddButton();
            ExpensesPage.dateMoreThanTomorrow();
            ExpensesPage.clearDateField();
            ExpensesPage.typeCurrentDate(yesterday);
            ExpensesPage.clickAddButton();
            ExpensesPage.dateLessThanToday();
        });
        it('Negative tests to verify validation of the Mileage field and error messages', () => {
            GaragePage.clickAddFuelExpensesButton();
            ExpensesPage.clickDateField();
            ExpensesPage.clearDateField();
            ExpensesPage.typeCurrentDate(today);
            ExpensesPage.clearMileageField();
            ExpensesPage.typeMileage(1000000);
            ExpensesPage.mileageBoundariesMessage();
            ExpensesPage.mileageFieldBorderColor();
            ExpensesPage.clearMileageField();
            ExpensesPage.typeMileage(50);
            ExpensesPage.typeLiters(100);
            ExpensesPage.typeTotalCost(120);
            ExpensesPage.clickAddButton();
            ExpensesPage.mileageEqualOrLessMessage();
            ExpensesPage.clearMileageField();
            ExpensesPage.clickMileageField();
            ExpensesPage.clickOut();
            ExpensesPage.mileageFieldBorderColor();
        });
        it('Negative tests to verify validation of the Number of Liters field and error messages', () => {
            GaragePage.clickAddFuelExpensesButton();
            ExpensesPage.clickDateField();
            ExpensesPage.clearDateField();
            ExpensesPage.typeCurrentDate(today);
            ExpensesPage.clearMileageField();
            ExpensesPage.typeMileage(51);
            ExpensesPage.typeLiters(10000);
            ExpensesPage.clickOut();
            ExpensesPage.litersBoundariesMessage();
            ExpensesPage.littersFieldBorderColor();
            ExpensesPage.clearLittersField();
            ExpensesPage.clickOut();
            ExpensesPage.litersRequiredMessage();
            ExpensesPage.littersFieldBorderColor();
        });
        it('Negative tests to verify validation of the Total Cost foeld and error messages', () => {
            GaragePage.clickAddFuelExpensesButton();
            ExpensesPage.clickDateField();
            ExpensesPage.clearDateField();
            ExpensesPage.typeCurrentDate(today);
            ExpensesPage.clearMileageField();
            ExpensesPage.typeMileage(51);
            ExpensesPage.typeLiters(100);
            ExpensesPage.clickTotalCost();
            ExpensesPage.clickOut();
            ExpensesPage.totalCostRequiredMessag();
            ExpensesPage.totalCostBorderColor();
            ExpensesPage.typeTotalCost(1000001);
            ExpensesPage.clickOut();
            ExpensesPage.totalCostValidationMessage();
            ExpensesPage.totalCostBorderColor();
        });
        it('Positive test to add valid expenses to an added car and verify that information is displayed correctly after adding it', () => {
            GaragePage.clickAddFuelExpensesButton();
            ExpensesPage.clickDateField();
            ExpensesPage.clearDateField();
            ExpensesPage.typeCurrentDate(today);
            ExpensesPage.clearMileageField();
            ExpensesPage.typeMileage(150);
            ExpensesPage.typeLiters(250);
            ExpensesPage.typeTotalCost(100);
            ExpensesPage.clickAddButton();
            ExpensesPage.fuelExpensesPageTitle();
            ExpensesPage.carSelectDropdown();
            ExpensesPage.dateTitle();
            ExpensesPage.dateUpdated();
            ExpensesPage.mileageTitle();
            ExpensesPage.mileageData();
            ExpensesPage.litersUsedTitle();
            ExpensesPage.litersUsedData();
            ExpensesPage.totalCostTitle();
            ExpensesPage.totalCostData();
            ExpensesPage.editButton();
            ExpensesPage.deleteButton();
            ExpensesPage.clickDeleteButton();//Deleting expenses added for a test
            ExpensesPage.clickRemoveExpensesButton();
        });

    });
    context('Deleting a car after running all tests', () => {
        it('Added car should be deleted', () => {
            GaragePage.clickEditCarButton();
            GaragePage.clickRemoveCarButton();
            GaragePage.clickConfirmRemoveButton();
            GaragePage.noCarsEddedMessage();
        });
    });



});
