const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space/',
    viewportWidth: 1200,
    viewportHeight: 800,
    env: {
      email: 'tomtest@gmail.com',
      password: 'Qwerty123'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      console.log("Running tests for ENV: prod"); // Show environment in console

      config.auth = {
        username: 'guest',
        password: 'welcome2qauto'
      };

      return config;
    },
  }
});
