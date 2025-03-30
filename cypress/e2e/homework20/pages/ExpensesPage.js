import 'cypress-real-events/support';

class ExpensesPage {
    fuelExpensesTitle() {
        cy.get('h1[_ngcontent-kyy-c79]').should('be.visible');
    }
    fuelExpensesPageTitle() {
        cy.contains('h1', 'Fuel expenses').should('be.visible');
    }
    carSelectDropdown() {
        cy.get('#carSelectDropdown').should('be.visible').contains('Porsche Panamera');
    }
    addExpensesButton() {
        cy.get('button.btn.btn-primary').should('be.visible').and('be.enabled');
    }
    addExpensesTitle() {
        cy.get('h1[_ngcontent-kyy-c71]').should('be.visible');
    }
    disabledAddButton() {
        cy.contains('button', 'Add').should('be.disabled');
    }
    enabledAddButton() {
        cy.contains('button', 'Add').should('be.enabled');
    }
    dateTitle() {
        cy.get('th[scope="col"]').contains('Date').should('be.visible');
    }
    dateUpdated() {
        cy.get('td.font-weight-bold').contains(/\d{2}\.\d{2}\.\d{4}/).should('be.visible');
    }
    mileageTitle() {
        cy.get('th[scope="col"]').contains('Mileage').should('be.visible');
    }
    mileageData(text) {
        cy.get('tbody tr').first().find('td:nth-child(2)').invoke('text').then((mileage) => {
            cy.log('First mileage value:', mileage);
            expect(mileage.trim()).to.not.be.empty;
        });
    }
    litersUsedTitle() {
        cy.get('th[scope="col"]').contains('Liters used').should('be.visible');
    }
    litersUsedData(text) {
        cy.get('tbody tr').first().find('td:nth-child(3)').invoke('text').then((liters) => {
            cy.log('First liters used value:', liters);
            expect(liters.trim()).to.not.be.empty;
        });
    }
    totalCostTitle() {
        cy.get('th[scope="col"]').contains('Total cost').should('be.visible');
    }
    totalCostData(text) {
        cy.get('tbody tr').first().find('td:nth-child(4)').invoke('text').then((cost) => {
            cy.log('First total cost value:', cost);
            expect(cost.trim()).to.match(/USD$/); // Ensures that format includes USD to pass tests on both environments"
        });
    }
    deleteButton() {
        cy.get('tbody tr').first().find('td').last().realHover();
        cy.get('.btn-delete').should('exist').and('be.visible');
    }
    editButton() {
        cy.get('tbody tr').first().find('td').last().realHover();
        cy.get('.btn-edit').should('exist').and('be.visible');
    }
    mileageField() {
        return cy.get('#addExpenseMileage');
    }
    litersField() {
        return cy.get('#addExpenseLiters');
    }
    totalCostField() {
        return cy.get('#addExpenseTotalCost');
    }
    dateField() {
        return cy.get('#addExpenseDate');
    }



    selectVehiclePorsche() {
        cy.get('select[name="carId"]').contains('option', 'Porsche Panamera').then(option => {
            cy.wrap(option).select();
        });
    }
    selectOptionPorschePanamera() {
        cy.get('#addExpenseCar').select('Porsche Panamera');
    }
    selectCurrentDate(currentDate) {
        cy.get('ngb-datepicker').contains('div.ngb-dp-day', currentDate).click();
    }
    selectTomorrowDate(tomorrowDateString) {
        cy.get('ngb-datepicker').contains('div.ngb-dp-day', tomorrowDateString).click();
    }
    selectInvalidYesterdayDate() {
        cy.get('ngb-datepicker').contains('div.ngb-dp-day', yesterdayday).click();
    }
    selectPorschPananmeraDropdown() {
        cy.get('#carSelectDropdown').should('be.visible').contains('Porsche Panamera')
        .click();
    }



    clickDateField() {
        cy.get('#addExpenseMileage').click();
    }
    clickMileageField() {
        cy.get('#addExpenseMileage').click();
    }
    clearMileageField() {
        cy.get('#addExpenseMileage').clear();
    }
    clickLitersField() {
        cy.get('#addExpenseLiters').should('be.visible');
    }
    clearLittersField() {
        cy.get('#addExpenseLiters').clear();
    }
    clickTotalCost() {
        cy.get('#addExpenseTotalCost').click();
    }
    clickCancelButton() {
        cy.get('button.btn.btn-secondary').click();
    }
    clickAddButton() {
        cy.get('.modal-footer .btn.btn-primary').click();
    }
    clearDateField() {
        cy.get('#addExpenseDate').clear();
    }
    clickOut() {
        cy.contains('h4.modal-title', 'Add an expense').click();
    }
    clickDeleteButton() {
        cy.get('tbody tr').first().find('td').last().realHover();
        cy.get('.btn-delete').should('exist').and('be.visible').click();
    }    
    clickEditButton() {
        cy.get('tbody tr').first().find('td').last().realHover();
        cy.get('.btn-edit').should('exist').and('be.visible').click();
    }
    clickRemoveExpensesButton() {
        cy.get('button.btn-danger').click();
    }
    clickExpensesPanelOption() {
        cy.get('a.btn.btn-white.btn-sidebar.sidebar_btn[href="/panel/expenses"]').click();
    }



    mileageRequiredMessage() {
        cy.contains('p', 'Mileage required').should('be.visible');
    }
    mileageBoundariesMessage() {
        cy.contains('p', 'Mileage has to be from 0 to 999999').should('be.visible');
    }
    mileageEqualOrLessMessage() {
        cy.contains('p', 'First expense mileage must not be less or equal to car initial mileage.');
    }
    litersRequiredMessage() {
        cy.contains('p', 'Liters required').should('be.visible');
    }
    litersBoundariesMessage() {
        cy.contains('p', 'Liters has to be from 0.01 to 9999').should('be.visible');
    }
    totalCostRequiredMessag() {
        cy.contains('p', 'Total cost required').should('be.visible');
    }
    totalCostValidationMessage() {
        cy.contains('p', 'Total cost has to be from 0.01 to 1000000').should('be.visible');
    }
    dateMoreThanTomorrow() {
        cy.contains('p', 'Report date has to be less than tomorrow').should('be.visible');
    }
    dateLessThanToday() {
        cy.contains('p.alert-danger', 'New expense date must not be less than car creation date');
    }



    mileageFieldBorderColor() {
        cy.get('#addExpenseMileage').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
    littersFieldBorderColor() {
        cy.get('#addExpenseLiters').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
    totalCostBorderColor() {
        cy.get('#addExpenseTotalCost').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }



    typeCurrentDate(date) {
        this.dateField().type(date)
        return this;
    }
    typeMileage(mileage) {
        this.mileageField().type(mileage);
        return this;
    }
    typeLiters(liters) {
        this.litersField().type(liters);
        return this;
    }
    typeTotalCost(totalcost) {
        this.totalCostField().type(totalcost);
        return this;
    }
}

export default new ExpensesPage;
