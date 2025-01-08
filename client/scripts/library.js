let books = [];

// Load books from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const savedBooks = localStorage.getItem("books");
  if (savedBooks) {
    books = JSON.parse(savedBooks);
    displayBooks();
  }
});

function addBook(event) {
  event.preventDefault(); // Prevent form submission and page reload

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;

  if (title && author) {
    books.push({ title, author });
    saveBooksToLocalStorage(); // Save updated books to localStorage
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    displayBooks();
  } else {
    alert("Please fill in both fields");
  }
}

function saveBooksToLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function deleteBook(index) {
  books.splice(index, 1);
  saveBooksToLocalStorage(); // Save updated books to localStorage
  displayBooks();
}

function editBook(index) {
  const newTitle = prompt("Enter new title:", books[index].title);
  const newAuthor = prompt("Enter new author:", books[index].author);

  if (newTitle && newAuthor) {
    books[index].title = newTitle;
    books[index].author = newAuthor;
    saveBooksToLocalStorage(); // Save updated books to localStorage
    displayBooks();
  } else {
    alert("Please fill in both fields");
  }
}

function displayBooks() {
  const booksList = document.getElementById("books");
  booksList.innerHTML = "";

  books.forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${book.title}</strong> by ${book.author}
                                  <button id="editpost" onclick="editBook(${index})">Edit</button>
                                  <button id="deletepost" onclick="deleteBook(${index})">Delete</button>`;
    booksList.appendChild(listItem);
  });
}
