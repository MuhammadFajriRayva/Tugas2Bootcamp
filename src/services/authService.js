const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const register = async (email, password) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("Email already used");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepository.createUser({
    email,
    password: hashedPassword
  });
};

const login = async (email,password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(
      password,
      user.password
    );

  if (!match) {
    throw new Error("Wrong password");
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

  const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d"
      }
    );

  await userRepository
    .updateRefreshToken(
      user.id,
      refreshToken
    );

  return {
    accessToken,
    refreshToken
  };
};

const changePassword = async (userId,oldPassword,newPassword) => {
  const user = await userRepository.findById(
      userId
    );

  const match = await bcrypt.compare(
      oldPassword,
      user.password
    );

  if (!match) {
    throw new Error(
      "Old password incorrect"
    );
  }

  const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

  await userRepository
    .updatePassword(
      userId,
      hashedPassword
    );

  return {
    message:
    "Password updated"
  };
};

const refreshAccessToken = async (refreshToken) => {
  const user = await userRepository
      .findByRefreshToken(
        refreshToken
      );

  if (!user) {
    throw new Error(
      "Refresh token invalid"
    );
  }

  const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

  const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

  return {
    accessToken:
      newAccessToken
  };

};

module.exports = {
  register,
  login,
  changePassword,
  refreshAccessToken
};