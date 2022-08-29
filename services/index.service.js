const csvConvert = require("./csv-convert.service");
const utils = require("./index.service.utils");

const usersById = new Map();
const usersByAge = new Map();
const usersByCountry = new Map();
const usersByFullName = new Map();
const usersByFullFirstName = new Map();
const usersByFullLastName = new Map();
const usersByFirstThreeLettersOfFirstName = new Map();
const usersByFirstThreeLettersOfLastName = new Map();

const fileName = "data.csv";
const users = csvConvert.getJsonFromCSVFile(fileName);

function initUserByIdIndex() {
  users.forEach((userDetails) => {
    usersById.set(userDetails.Id, userDetails);
  });
}

function initUserByCountryIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    if (usersByCountry.has(userDetails.Country)) {
      usersList = usersByCountry.get(userDetails.Country);
    }

    usersList.push(userDetails);
    usersByCountry.set(userDetails.Country, usersList);
  });
}

function initUserByAgeIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    const age = utils.calculateAge(userDetails.DOB);
    if (usersByAge.has(age)) {
      usersList = usersByAge.get(age);
    }

    usersList.push(userDetails);
    usersByAge.set(age, usersList);
  });
}

function initUserByFullNameIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    const lowerCaseName = userDetails.Name.toLowerCase();
    if (usersByFullName.has(lowerCaseName)) {
      usersList = usersByFullName.get(lowerCaseName);
    }

    usersList.push(userDetails);
    usersByFullName.set(lowerCaseName, usersList);
  });
}

function initUserByFullFirstNameIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    const firstName = utils.getFirstName(userDetails.Name);
    if (usersByFullFirstName.has(firstName)) {
      usersList = usersByFullFirstName.get(firstName);
    }
    usersList.push(userDetails);
    usersByFullFirstName.set(firstName, usersList);
  });
}

function initUserByFullLastNameIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    const lastName = utils.getLastName(userDetails.Name);
    if (usersByFullLastName.has(lastName)) {
      usersList = usersByFullLastName.get(lastName);
    }
    usersList.push(userDetails);
    usersByFullLastName.set(lastName, usersList);
  });
}

function initUserByFirstThreeLettersOfFirstNameIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    const firstName = utils.getFirstName(userDetails.Name);
    const firstThreeLettersOfFirstName = utils.getFirstThreeLetters(firstName);
    if (usersByFirstThreeLettersOfFirstName.has(firstThreeLettersOfFirstName)) {
      usersList = usersByFirstThreeLettersOfFirstName.get(
        firstThreeLettersOfFirstName
      );
    }
    usersList.push(userDetails);
    usersByFirstThreeLettersOfFirstName.set(
      firstThreeLettersOfFirstName,
      usersList
    );
  });
}

function initUserByFirstThreeLettersOfLastNameIndex() {
  users.forEach((userDetails) => {
    let usersList = [];
    const lastName = utils.getLastName(userDetails.Name);
    const firstThreeLettersOfLastName = utils.getFirstThreeLetters(lastName);
    if (usersByFirstThreeLettersOfLastName.has(firstThreeLettersOfLastName)) {
      usersList = usersByFirstThreeLettersOfLastName.get(
        firstThreeLettersOfLastName
      );
    }
    usersList.push(userDetails);
    usersByFirstThreeLettersOfLastName.set(
      firstThreeLettersOfLastName,
      usersList
    );
  });
}

function getUsersByFullFirstNameAndLastName(name) {
  let firstNameUsers = {},
    lastNameUsers = {};
  if (usersByFullFirstName.has(name)) {
    firstNameUsers = usersByFullFirstName.get(name);
  }
  if (usersByFullLastName.has(name)) {
    lastNameUsers = usersByFullLastName.get(name);
  }
  return [...Object.values(firstNameUsers), ...Object.values(lastNameUsers)];
}

function getUsersByFirstThreeLettersOfFirstNameAndLastName(
  name,
  lowerCaseName,
  firstThreeLetters
) {
  let firstNameUsers = {},
    lastNameUsers = {};

  if (usersByFirstThreeLettersOfFirstName.has(firstThreeLetters)) {
    firstNameUsers = usersByFirstThreeLettersOfFirstName.get(firstThreeLetters);
  }
  if (usersByFirstThreeLettersOfLastName.has(firstThreeLetters)) {
    lastNameUsers = usersByFirstThreeLettersOfLastName.get(firstThreeLetters);
  }

  const usersByFirstThreeLetters = [
    ...Object.values(firstNameUsers),
    ...Object.values(lastNameUsers),
  ];

  if (name.length == 3) {
    return usersByFirstThreeLetters;
  } else {
    // more than 3 letters but not full first name or last name
    const users = [];
    for (const firstThreeLetters in usersByFirstThreeLetters) {
      let user = usersByFirstThreeLetters[firstThreeLetters];
      if (utils.checkMatch(lowerCaseName, user.Name.toLowerCase())) {
        users.push(user);
      }
    }
    return users;
  }
}

function deleteUserFromIdIndex(userToDelete) {
  usersById.delete(userToDelete.Id);
}

function deleteUserFromCountryIndex(userToDelete) {
  const users = usersByCountry.get(userToDelete.Country);
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByCountry.set(userToDelete.Country, UsersWithoutDeletedUser);
}

function deleteUserFromAgeIndex(userToDelete) {
  const age = utils.calculateAge(userToDelete.DOB);
  let users = usersByAge.get(age);
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByAge.set(age, UsersWithoutDeletedUser);
}

function deleteUserFromFullNameIndex(userToDelete) {
  const fullName = userToDelete.Name.toLowerCase();
  let users = usersByFullName.get(fullName);
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByFullName.set(fullName, UsersWithoutDeletedUser);
}

function deleteUserFromFullFirstNameIndex(userToDelete) {
  const firstName = utils.getFirstName(userToDelete.Name);
  let users = usersByFullFirstName.get(firstName);
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByFullFirstName.set(firstName, UsersWithoutDeletedUser);
}

function deleteUserFromFullLastNameIndex(userToDelete) {
  const firstName = utils.getLastName(userToDelete.Name);
  let users = usersByFullLastName.get(firstName);
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByFullLastName.set(firstName, UsersWithoutDeletedUser);
}

function deleteUserFromFirstThreeLettersOfFirstNameIndex(userToDelete) {
  const firstName = utils.getFirstName(userToDelete.Name);
  const firstThreeLettersOfFirstName = utils.getFirstThreeLetters(firstName);
  let users = usersByFirstThreeLettersOfFirstName.get(
    firstThreeLettersOfFirstName
  );
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByFirstThreeLettersOfFirstName.set(
    firstThreeLettersOfFirstName,
    UsersWithoutDeletedUser
  );
}

function deleteUserFromFirstThreeLettersOfLastNameIndex(userToDelete) {
  const lastName = utils.getLastName(userToDelete.Name);
  const firstThreeLettersOfLastName = utils.getFirstThreeLetters(lastName);
  let users = usersByFirstThreeLettersOfLastName.get(
    firstThreeLettersOfLastName
  );
  const UsersWithoutDeletedUser = users.filter(
    (user) => user.Id != userToDelete.Id
  );
  usersByFirstThreeLettersOfLastName.set(
    firstThreeLettersOfLastName,
    UsersWithoutDeletedUser
  );
}

module.exports = {
  initIndexes: function () {
    initUserByIdIndex();
    initUserByAgeIndex();
    initUserByCountryIndex();
    initUserByFullNameIndex();
    initUserByFullFirstNameIndex();
    initUserByFullLastNameIndex();
    initUserByFirstThreeLettersOfFirstNameIndex();
    initUserByFirstThreeLettersOfLastNameIndex();
  },

  getUserByIdFromIndex: function (id) {
    return usersById.get(id);
  },

  getUsersByAgeFromIndex: function (age) {
    return usersByAge.get(age);
  },

  getUsersByCountryFromIndex: function (country) {
    return usersByCountry.get(country);
  },

  getUsersByNameFromIndex: function (name) {
    const firstThreeLetters = utils.getFirstThreeLetters(name);
    const lowerCaseName = name.toLowerCase();

    if (usersByFullName.has(lowerCaseName)) {
      return usersByFullName.get(lowerCaseName);
    } else if (
      usersByFullFirstName.has(lowerCaseName) ||
      usersByFullLastName.has(lowerCaseName)
    ) {
      return getUsersByFullFirstNameAndLastName(lowerCaseName);
    } else if (
      usersByFirstThreeLettersOfFirstName.has(firstThreeLetters) ||
      usersByFirstThreeLettersOfLastName.has(firstThreeLetters)
    ) {
      return getUsersByFirstThreeLettersOfFirstNameAndLastName(
        name,
        lowerCaseName,
        firstThreeLetters
      );
    }
  },

  deleteUserFromIndexes: function (id) {
    const userToDelete = usersById.get(id);
    deleteUserFromIdIndex(userToDelete);
    deleteUserFromAgeIndex(userToDelete);
    deleteUserFromCountryIndex(userToDelete);
    deleteUserFromFullNameIndex(userToDelete);
    deleteUserFromFullFirstNameIndex(userToDelete);
    deleteUserFromFullLastNameIndex(userToDelete);
    deleteUserFromFirstThreeLettersOfFirstNameIndex(userToDelete);
    deleteUserFromFirstThreeLettersOfLastNameIndex(userToDelete);
  },
};
