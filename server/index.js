//import modules
const express = require("express");
const path = require("path"); //Helps deal with file paths across different OS's
const app = express(); //Create instance of Express application
const PORT = 3000;

//Middleware to parse JSON request
app.use(express.json());

//Joining path segments
const clientPath = path.join(__dirname, "../client");

// Middleware to serve static assets (e.g., CSS, JS, images)
app.use(
  express.static(clientPath, {
    setHeaders: (res, filePath) => {
      // Ensure correct MIME type for JavaScript files
      if (path.extname(filePath) === ".js") {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

//Serve HTML for 'Home' page
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "Pages/home.html"));
});

//Serve HTML for 'Browse Books' file
app.get("/browse", (req, res) => {
  res.sendFile(path.join(clientPath, "Pages/browse.html"));
});

//Serve HTML for 'About Us' file
app.get("/about", (req, res) => {
  res.sendFile(path.join(clientPath, "Pages/about.html"));
});

//Serve HTML for 'Profile'
app.get("/blog", (req, res) => {
  res.sendFile(path.join(clientPath, "Pages/blog.html"));
});

//Serve HTML for 'library'
app.get("/library", (req, res) => {
  res.sendFile(path.join(clientPath, "Pages/library.html"));
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
