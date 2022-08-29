const indexService = require("../services/index.service");

indexService.initIndexes();

module.exports = {
  getUserById: async function (id) {
    console.log(`getUserById called with id: ${id}`);

    return indexService.getUserByIdFromIndex(id);
  },

  getUsersByAge: async function (age) {
    console.log(`getUsersByAge called with age: ${age}`);

    return indexService.getUsersByAgeFromIndex(age);
  },

  getUsersByCountry: async function (country) {
    console.log(`getUsersByCountry called with country: ${country}`);

    return indexService.getUsersByCountryFromIndex(country);
  },

  getUsersByName: async function (name) {
    console.log(`searchUsersByName called with name: ${name}`);

    return indexService.getUsersByNameFromIndex(name);
  },

  deleteUser: async function (id) {
    console.log(`deleteUser called with id: ${id}`);

    indexService.deleteUserFromIndexes(id);
  },
};
