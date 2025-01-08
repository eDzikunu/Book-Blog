let posts = JSON.parse(localStorage.getItem("posts")) || []; //Load post from localStorge
//Load posts on page
document.addEventListener("DOMContentLoaded", renderPosts);

function addPost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const user = document.getElementById("user").value;
  const summary = document.getElementById("summary").value;
  const imageInput = document.getElementById("image");

  if (imageInput.files && imageInput.files[0]) {
    // Read file in appropriate format
    const reader = new FileReader();

    //When the file is read
    reader.onload = function (e) {
      const image = e.target.result;
      const post = { author, title, user, summary, image };
      posts.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
    };

    reader.readAsDataURL(imageInput.files[0]);
  } else {
    alert("Please fill in all fields");
  }
}

function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts)); //Update localStorage
  renderPosts();
}

function editPost(index) {
  const post = posts[index];

  // fill form with the current post data
  document.getElementById("author").value = post.author;
  document.getElementById("title").value = post.title;
  document.getElementById("user").value = post.user;
  document.getElementById("summary").value = post.summary;

  // Change the submit button's behavior to save changes
  const form = document.getElementById("postForm");
  form.onsubmit = function (event) {
    event.preventDefault();

    // Update the post with new values
    posts[index] = {
      author: document.getElementById("author").value,
      title: document.getElementById("title").value,
      user: document.getElementById("user").value,
      summary: document.getElementById("summary").value,
      image: post.image,
    };

    form.reset();
    form.onsubmit = addPost; // Return the form to its default behavior

    renderPosts();
  };
}

function renderPosts() {
  const postsList = document.getElementById("postsList");
  postsList.innerHTML = "";

  posts.forEach((post, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <strong>${post.title}</strong> by ${post.author}
    <div class="review" style"display:flex;">
    <p>${post.summary}</p>
    <img src="${post.image}" alt="${post.title}" style="max-width: 15%; margin-top: 10px;">
    </div> 
    <button id="editpost" onclick="editPost(${index})">Edit</button>
    <button id="deletepost" onclick="deletePost(${index})">Delete</button>`;
    postsList.appendChild(listItem);
  });
}
