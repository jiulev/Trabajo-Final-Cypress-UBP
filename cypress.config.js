// cypress.config.js
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').default;

async function setupNodeEvents(on, config) {
  // ✅ Limitar a archivos *.steps.js (UI y API)
  await addCucumberPreprocessorPlugin(on, config, {
    stepDefinitions: [
      'cypress/journeys/step_definitions/ui/**/*.steps.js',
      'cypress/journeys/step_definitions/api/**/*.steps.js',
    ],
  });

  // ÚNICO preprocessor
  on('file:preprocessor', createBundler({
    plugins: [createEsbuildPlugin(config)],
  }));

  // tags por env (lo tuyo)
  config.env.tags = process.env.TAGS || config.env.tags || '';
  return config;
}

module.exports = defineConfig({
  env: { tags: '' },
  e2e: {
    setupNodeEvents,
    specPattern: 'cypress/journeys/**/features/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    watchForFileChanges: false,
  },
});
