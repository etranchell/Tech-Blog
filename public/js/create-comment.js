const btn = document.querySelector(".comment-btn");

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_body = document
    .querySelector('textarea[name="comment_body"]')
    .value.trim();
  const blog_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  if (comment_body) {
    const response = await fetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify({
        blog_id,
        comment_body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

btn.addEventListener("click", commentFormHandler);
