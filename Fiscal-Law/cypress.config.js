const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // No specific setup for mochawesome is needed
      return config;
    },
    baseUrl: "https://example.com",
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome", 
    overwrite: false,                         
    html: false,                              
    json: true                                
  }
});
