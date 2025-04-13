const { defineConfig } = require("cypress");
require('dotenv').config();  // Cargar el archivo .env


module.exports = defineConfig({
  e2e: {
    baseUrl: `https://crudcrud.com/api/${process.env.API_KEY}`,
    setupNodeEvents(on, config) {
    },
  },
});
