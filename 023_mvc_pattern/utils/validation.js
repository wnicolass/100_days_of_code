function isValidPost({ title, content }) {
  return title && content && title.trim() !== "" && content.trim() !== "";
}

module.exports = {
  isValidPost,
};
