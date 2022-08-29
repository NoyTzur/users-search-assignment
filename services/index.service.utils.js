function isPartialMatch(string, userName) {
  for (let i = 0; i < string.length; i++) {
    if (string[i] != userName[i]) {
      return false;
    }
  }

  return true;
}

function changeDateFormat(dateString) {
  const dateArray = dateString.split("/");
  return dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
}

module.exports = {
  calculateAge: function (dateString) {
    var newFormat = changeDateFormat(dateString);
    var today = new Date();
    var birthDate = new Date(newFormat);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  },

  getFirstName: function (fullName) {
    const firstName = fullName.split(" ")[0];
    return firstName.toLowerCase();
  },

  getLastName: function (fullName) {
    const lastName = fullName.split(" ")[1];
    return lastName.toLowerCase();
  },

  getFirstThreeLetters: function (string) {
    return string.slice(0, 3).toLowerCase();
  },

  checkMatch: function (string, fullName) {
    const firstName = this.getFirstName(fullName);
    const lastName = this.getLastName(fullName);

    if (isPartialMatch(string, firstName) || isPartialMatch(string, lastName)) {
      return true;
    }

    return false;
  },
};
