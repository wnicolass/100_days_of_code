const loadCommentsBtn = document.getElementById("load-comments-btn");
const commentsSection = document.getElementById("comments");
const commentsFormEl = document.querySelector("#comments-form form");
const commentTitleEl = document.getElementById("title");
const commentTextEl = document.getElementById("text");

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

    if (data.length === 0) {
      commentsSection.firstElementChild.textContent =
        "We could not find any comments. Maybe add one?";
      return;
    }
    const commentsListEl = createCommentsList(data);
    commentsSection.innerHTML = "";
    commentsSection.appendChild(commentsListEl);
  } catch (err) {
    console.error(err.message);
  }
}

function saveComment(event) {
  event.preventDefault();

  const postId = commentsFormEl.dataset.postid;
  const comment = {
    title: commentTitleEl.value,
    text: commentTextEl.value,
  };
  fetch(`/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })
    .then(() => {
      fetchCommentsForPost();
      commentsFormEl.reset();
    })
    .catch((err) => console.error(err.message));
}

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
commentsFormEl.addEventListener("submit", saveComment);
