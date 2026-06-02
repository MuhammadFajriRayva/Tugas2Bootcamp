const express = require("express");
const router = express.Router();

let books = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    price: 75000,
    stock: 10
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    price: 95000,
    stock: 5
  }
];

// GET semua buku
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books
  });
});

// GET buku berdasarkan ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.status(200).json({
    success: true,
    data: book
  });
});

// POST tambah buku
router.post("/", (req, res) => {
  const { title, author, price, stock } = req.body;

  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    price,
    stock
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: "Book added successfully",
    data: newBook
  });
});

// PUT update buku
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find(book => book.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  const { title, author, price, stock } = req.body;

  book.title = title;
  book.author = author;
  book.price = price;
  book.stock = stock;

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book
  });
});

// DELETE buku
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  const deletedBook = books[index];

  books.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: deletedBook
  });
});

module.exports = router;