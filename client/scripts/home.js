// Load random reviews on page load
document.addEventListener("DOMContentLoaded", async () => {
  const books = await fetchBooks();
  const randomBooks = getRandomBooks(books, 6);
  renderRecentPosts(randomBooks);
});

// Fetch and display random book reviews
async function fetchBooks() {
  try {
    const response = await fetch("../books/books.json");
    if (!response.ok) throw new Error("Failed to load static book data");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
// Randomly select books from the fetched reviews
function getRandomBooks(books, count = 6) {
  const shuffled = books.sort(() => 0.5 - Math.random()); // Shuffle the array
  return shuffled.slice(0, count); // Return the first `count` reviews
}

// Render books into the Recent Posts section
function renderRecentPosts(books) {
  const bookGrid = document.getElementById("bookGrid");
  bookGrid.innerHTML = ""; // Clear previous content

  books.forEach((book) => {
    const postCard = document.createElement("div");
    postCard.className = "post-card";

    postCard.innerHTML = `
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p>${book.summary}</p>
          <a>Read More</a>
      `;

    bookGrid.appendChild(postCard);
  });
}
