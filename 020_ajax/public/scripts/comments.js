const loadCommentsBtn = document.getElementById("load-comments-btn");
const commentsSection = document.getElementById("comments");

async function fetchCommentsForPost() {
  const postId = loadCommentsBtn.dataset.postid;

  try {
    const res = await fetch(`/posts/${postId}/comments`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err.message);
  }
}

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
