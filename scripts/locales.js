const fs = require('fs-extra')
const path = require("path");

// Move locales to main folder
const localesSrc = path.resolve("./dist/behaviors/localization/locales");
const localesDest = path.resolve("./dist/locales");

// Update locale references
fs
    .readdirSync(localesDest)
    .filter(f => f.includes(".d.ts"))
    .forEach(f => {
        // Rewrite references
        const rewritten = fs
            .readFileSync(`${localesDest}/${f}`)
            .toString()
            .replace("./interfaces/values", "../index")

        fs.writeFileSync(`${localesDest}/${f}`, rewritten)
    });