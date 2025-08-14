import App from "../pages/app";

const app = new App();

describe('Fiscal Law Website', () => {

    it('should open the app and verify the title', () => {
        app.openApp();
    });

});
