const fs = require("fs-extra");
const path = require("path");

const dist = path.resolve("./dist");
const bundles = path.resolve("./bundles");
const locales = path.resolve("./locales");

if (fs.existsSync(dist)) {
    fs.removeSync(dist);
}

if (fs.existsSync(bundles)) {
    fs.removeSync(bundles);
}

if (fs.existsSync(locales)) {
    fs.removeSync(locales);
}