const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML Routes
const pagesRoutes = require("./routes/pages");
app.use("/", pagesRoutes);

// API Routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
