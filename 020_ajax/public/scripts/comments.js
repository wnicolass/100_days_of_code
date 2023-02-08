const loadCommentsBtn = document.getElementById("load-comments-btn");
const commentsSection = document.getElementById("comments");

function createCommentsList(comments) {
  const commentListEl = document.createElement("ol");

  for (const comment of comments) {
    const commentEl = document.createElement("li");
    commentEl.innerHTML = `
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;
    commentListEl.appendChild(commentEl);
  }

  return commentListEl;
}

async function fetchCommentsForPost() {
  const postId = loadCommentsBtn.dataset.postid;

  try {
    const res = await fetch(`/posts/${postId}/comments`);
    const data = await res.json();

    const commentsListEl = createCommentsList(data);
    commentsSection.innerHTML = "";
    commentsSection.appendChild(commentsListEl);
  } catch (err) {
    console.error(err.message);
  }
}

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
