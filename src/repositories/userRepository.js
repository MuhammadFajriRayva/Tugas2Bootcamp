const prisma = require("../config/prisma");

const findByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const createUser = (data) => {
  return prisma.user.create({
    data
  });
};

const findById = (id) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

const updatePassword = (id, password) => {
  return prisma.user.update({
    where: { id },
    data: { password }
  });
};

const updateRefreshToken = (id, refreshToken) => {
  return prisma.user.update({
    where: { id },
    data: { refreshToken }
  });
};

const findByRefreshToken = (refreshToken) => {
  return prisma.user.findFirst({
    where: { refreshToken }
  });
};

module.exports = {
  findByEmail,
  createUser,
  findById,
  updatePassword,
  updateRefreshToken,
  findByRefreshToken
};

