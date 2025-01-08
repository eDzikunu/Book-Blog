document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category-title");

  categories.forEach((categoryElement) => {
    const categoryTitle = categoryElement.textContent;
    const formattedCategory = encodeURIComponent(
      categoryTitle.trim().toLowerCase()
    );

    // Get the corresponding post-wrapper for this category
    const booksContainer =
      categoryElement.nextElementSibling.querySelector(".post-wrapper");

    fetchRandomBooksByCategory(formattedCategory, booksContainer);
  });
});

async function fetchRandomBooksByCategory(category, container) {
  const maxBooks = 100; // Maximum books to consider for randomness
  const pageSize = 4; // Number of books to fetch per request
  const randomStartIndex = Math.floor(Math.random() * (maxBooks - pageSize)); // Generate random startIndex

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=${randomStartIndex}&maxResults=${pageSize}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Populate books into the specific container
    populateBooks(data.items, container);
  } catch (error) {
    console.error(`Error fetching random books for ${category}:`, error);
  }
}

function populateBooks(books, container) {
  container.innerHTML = "";

  books.forEach((book) => {
    const volumeInfo = book.volumeInfo;

    const bookCard = document.createElement("div");
    bookCard.className = "book-card";

    bookCard.innerHTML = `
          <img src="${
            volumeInfo.imageLinks?.thumbnail ||
            "https://via.placeholder.com/128x192?text=No+Image"
          }" alt="${volumeInfo.title}">
          <h3>${volumeInfo.title}</h3>
          <p>by ${volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
        `;

    container.appendChild(bookCard);
  });
}
