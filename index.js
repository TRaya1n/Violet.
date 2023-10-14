// Import the required modules.
const chalk = require("chalk");

try {
  // Load the 'src' folder
  console.log(chalk.red("<system>"), chalk.blue("Loading src folder..."));
  require("./src/main.js");

  // catch the error and log it
} catch (error) {
  console.log(chalk.red("<system:error>"), chalk.blue(error));
  require("./src/main.js");
}
