class GaragePage {
    garageTitle() {
        cy.contains('h1', 'Garage').should('be.visible');
    }
    addCarTitle() {
        cy.contains('h4', 'Add a car').should('be.visible');
    }
    disabledAddButton() {
        cy.get('ngb-modal-window.d-block.modal.fade.show');
    }
    enabledAddButton() {
        cy.contains('button', 'Add').should('be.enabled');//it can be deleted later if not used
    }
    porscheIcon() {
        cy.get('img.car-logo_img[alt="Panamera"]').should('be.visible');
    }
    porsheTitle() {
        cy.contains('p', 'Porsche Panamera').should('be.visible');
    }
    editCarButton() {
        cy.get('button.car_edit.btn.btn-edit').should('be.visible').and('be.enabled');
    }
    addFuelExpensesButton() {
        cy.get('button.car_add-expense.btn.btn-success').should('be.visible').and('be.enabled');
    }
    updateMileageTitle() {
        cy.get('p.car_update-mileage').should('be.visible').invoke('text').should(text => {
            expect(text.trim()).to.match(/Update mileage • \d{2}\.\d{2}\.\d{4}/);
        });
    }
    mileageIcon() {
        cy.get('span.update-mileage-form_icon.icon-tachometer').should('be.visible');
    }
    mileageInput() {
        cy.get('input.update-mileage-form_input[name="miles"][formcontrolname="miles"]').should('be.visible');
    }
    updateMileageButton() {
        cy.get('button.update-mileage-form_submit.btn.btn-secondary.btn-sm[disabled]').should('be.visible');
    }
    mileageField() {
        return cy.get('#addCarMileage');
    }
    noCarsEddedMessage() {
        return cy.contains('p', 'You don’t have any cars in your garage').should('be.visible');
    }




    mileageRequiredMessage() {
        cy.contains('p', 'Mileage cost required').should('be.visible');
    }
    mileageValidationMessage() {
        cy.contains('p', 'Mileage has to be from 0 to 999999').should('be.visible');
    }




    mileageFieldBoderColor() {
        cy.get('#addCarMileage').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }




    clickAddCarButton() {
        cy.contains('button', 'Add car').click();
    }
    selectOptionPorscheToAddCar() {
        cy.get('select#addCarBrand').select('Porsche');
    }
    selecktOptionPanameraToAddCar() {
        cy.get('#addCarModel').select('Panamera');
    }
    clickMileageField() {
        cy.get('#addCarMileage').click();
    }
    clickCancelButton() {
        cy.get('button.btn.btn-secondary').click();
    }
    clickAddButton() {
        cy.get('ngb-modal-window').find('button.btn.btn-primary').click();
    }
    clickOut() {
        cy.contains('h4', 'Add a car').click();
    }
    clickAddFuelExpensesButton() {
        cy.get('button.car_add-expense.btn.btn-success').click();
    }
    clickEditCarButton() {
        cy.get('button.car_edit.btn.btn-edit').click();
    }
    clickRemoveCarButton() {
        cy.get('button[type="button"].btn-outline-danger').click();
    }
    clickConfirmRemoveButton() {
        cy.get('button[type="button"].btn-danger').click();
    }




    typeMileage(mileage) {
        this.mileageField().type(mileage);
        return this;
    }
}

export default new GaragePage();
