let csvToJson = require("convert-csv-to-json");

module.exports = {
  getJsonFromCSVFile: function (fileName) {
    return csvToJson.fieldDelimiter(",").getJsonFromCsv(fileName);
  },
};
