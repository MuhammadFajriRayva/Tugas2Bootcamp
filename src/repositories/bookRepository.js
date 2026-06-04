const prisma = require("../config/prisma");

const getAllBooks = () => {
  return prisma.book.findMany();
};

const getBookById = (id) => {
  return prisma.book.findUnique({
    where: { id }
  });
};

const createBook = (data) => {
  return prisma.book.create({
    data
  });
};

const updateBook = (id, data) => {
  return prisma.book.update({
    where: { id },
    data
  });
};

const deleteBook = (id) => {
  return prisma.book.delete({
    where: { id }
  });
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};