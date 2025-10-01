// cypress.config.js
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').default;

async function setupNodeEvents(on, config) {
  // 👈 Esto primero (clave para que ande en "open")
  await addCucumberPreprocessorPlugin(on, config);

  // 👈 Un ÚNICO file:preprocessor
  on('file:preprocessor', createBundler({
    plugins: [createEsbuildPlugin(config)],
  }));

  // No registres otro "file:preprocessor" ni sobrescribas "on('task', ...)" después
  // (si necesitás tasks propios, decime y te muestro cómo combinarlos sin pisar los del plugin)

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
