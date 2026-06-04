const repository =
  require("../repositories/bookRepository");

const getAllBooks = () => {
  return repository.getAllBooks();
};

const getBookById = (id) => {
  return repository.getBookById(id);
};

const createBook = (data) => {
  return repository.createBook(data);
};

const updateBook = (id, data) => {
  return repository.updateBook(id, data);
};

const deleteBook = (id) => {
  return repository.deleteBook(id);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};