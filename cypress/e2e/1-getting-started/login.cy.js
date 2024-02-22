//используй Prettier или другие расширения для авто-форматирования кода

beforeEach(() => {
    cy.visit("/login");
});//создать фикстуру с данными для всех кейсов

describe("Checks For Login", () => {
    it("successful login", () => {
        cy.get("#username").type(Cypress.env("LOGIN"));
        cy.get("#password").type(Cypress.env("PASSWORD"));
        // согласно POM создай директорию Pages --> loginPage, там создай метод для логинеа,
        // который будешь вызывать тут и передавать Login и Password
        cy.clickElement(
            "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
        );
        //передай данные из фикстуры в метод successfulLogin
        //нажатие на кнопку обернуть так же в successfulLogin'e, локатор вынести отдельно в registrationPage и переиспользовать его в методах, где он нужен
        //nit: посмотреть, можно ли сократить локатор, относится ко всем в тесте

        cy.checkText("#task-heading > span", "Tasks");
    });

    it("unsuccessful login with wrong username", () => {
        cy.get("#username").type("test_user");
        cy.get("#password").type(Cypress.env("PASSWORD"));

        cy.clickElement(
            "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
        );
        //сделать то же самое, согласно комментам выше
        cy.checkText(
            "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span",
            //локатор вынести отдельно согласно
            "Failed to sign in! Please check your credentials and try again."
            //ожидаемый текст добавить в фикстуру, передать в метод
        );
    });

    it("unsuccessful login with wrong password", () => {
        cy.get("#username").type(Cypress.env("LOGIN"));
        cy.get("#password").type(34566);
        cy.clickElement(
            "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
        );
        cy.checkText(
            "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span",
            "Failed to sign in! Please check your credentials and try again."
        );
        //сделать то же самое
    });

    it("unsuccessful login with empty fields", () => {
        cy.get("#username").type(" ");
        cy.get("#password").type(" ");
        cy.clickElement(
            "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
        );
        cy.checkText(
            "#login-page > div > form > div.modal-body > div.row > div:nth-child(1) > div > span",
            "Failed to sign in! Please check your credentials and try again."
        );
        //сделать то же самое
    });

    it.only("redirection to 'forget your password' page", () => {
        cy.clickElement(
            "#login-page > div > form > div.modal-body > div:nth-child(3) > a > span"
        );
        //локатор вынести отдельно
        cy.checkUrl("/account/reset/request");
    });

    it.only("redirection to 'registration' page", () => {
        cy.clickElement(
            "#login-page > div > form > div.modal-body > div:nth-child(4) > a > span"
        );
        //локатор вынести отдельно
        cy.checkUrl("/account/register");
    });
});