const service =
  require("../services/bookService");

const getAllBooks = async (req, res) => {

  const books =
    await service.getAllBooks();

  res.status(200).json(books);

};

const getBookById = async (req, res) => {

  const id =
    parseInt(req.params.id);

  const book =
    await service.getBookById(id);

  if (!book) {

    return res.status(404).json({
      message: "Book not found"
    });

  }

  res.status(200).json(book);

};

const createBook = async (req, res) => {

  const book =
    await service.createBook(req.body);

  res.status(201).json(book);

};

const updateBook = async (req, res) => {

  const id =
    parseInt(req.params.id);

  const book =
    await service.updateBook(
      id,
      req.body
    );

  res.status(200).json(book);

};

const deleteBook = async (req, res) => {

  const id =
    parseInt(req.params.id);

  await service.deleteBook(id);

  res.status(200).json({
    message: "Book deleted"
  });

};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};