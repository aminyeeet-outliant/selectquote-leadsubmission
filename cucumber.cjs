module.exports = {
    default: {
      // Load TypeScript files directly
      require: [
        "ts-node/register",
        "tests/steps/**/*.ts",
        "tests/support/**/*.ts"
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

