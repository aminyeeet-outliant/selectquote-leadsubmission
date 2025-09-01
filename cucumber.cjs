module.exports = {
    default: {
      // Load TypeScript files directly
      require: [
        'dist/steps/**/*.js',
        'dist/support/**/*.js'
      ],
      // Where your .feature files live
      paths: ["tests/features/**/*.feature"],
      // Reporters
      format: [
        "progress",
        "html:reports/cucumber-report.html"
      ],
      publishQuiet: true,
      // Fail if undefined steps are found
      strict: true
    },
  };

