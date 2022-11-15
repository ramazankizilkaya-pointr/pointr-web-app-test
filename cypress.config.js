const { defineConfig } = require("cypress")
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor")
const preprocessor = require("@badeball/cypress-cucumber-preprocessor")
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild")

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )
  return config
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://pointr-sample-web-app.pointr.cloud",
    defaultCommandTimeout: 50000,
    specPattern: "./cypress/e2e/**/*.feature",
    screenshotsFolder: "./cypress/results/screenshots",
    videosFolder: "./cypress/results/videos",
    excludeSpecPattern: "*!spec.js",
    trashAssetsBeforeRuns: true,
    watchForFileChanges: true,
    //supportFile: "./cypress/support/*.js",
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents,
  },
})
