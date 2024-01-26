const validator = require("validator");

function sanitizeString(dirtyString) {

    // if (typeof dirtyString == "string") {
        let cleanString = validator.blacklist(dirtyString, /<>\/\\\|`"'~/);
        cleanString = validator.escape(cleanString);
        cleanString = validator.trim(cleanString);
        cleanString = validator.stripLow(cleanString);
        return cleanString;
    // } else return "";

}

exports.sanitizeString = sanitizeString;