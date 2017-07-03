const fs = require('fs-extra')
const path = require("path");

// Move locales to main folder
const localesSrc = path.resolve("./dist/behaviors/localization/locales");
const localesDest = path.resolve("./locales");

fs.copySync(localesSrc, localesDest);