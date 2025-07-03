module.exports = {
    default: {
      require: ['features/step-definitions/**/*.ts', 'src/support/**/*.ts'],
      requireModule: ['ts-node/register'],
      format: ['progress', 'json:reports/cucumber-report.json'],
      formatOptions: { snippetInterface: 'async-await' },
      paths: ['features/**/*.feature'],
      
    }
  };