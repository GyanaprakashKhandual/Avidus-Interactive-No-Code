class App {

    openApp() {
        cy.visit('https://fiscal-law.webflow.io/');
        cy.title().should('eq', 'Fiscal Law'); 
    }

    

}

export default App;
