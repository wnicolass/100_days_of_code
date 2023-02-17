function isValidPost({ title, content }) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

function isValidUserData(email, password, confirmEmail) {
  return email && password && password.length >= 6 && email === confirmEmail;
}

module.exports = {
  isValidPost,
  isValidUserData,
};
