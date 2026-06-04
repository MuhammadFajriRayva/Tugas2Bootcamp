const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register(email,password);
    res.status(201).json(user);

  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const login = async (req,res) => {
  try {
    const result = await authService.login(req.body.email,req.body.password);
    res.json(result);

  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

const profile = async (req,res) => {
  res.json({user: req.user});
};

const changePassword = async (req,res) => {
  const result = await authService
      .changePassword(
        req.user.id,
        req.body.oldPassword,
        req.body.newPassword
      );
  res.json(result);
};

const refreshToken =async (req,res) => {
  try {
    const result = await authService
        .refreshAccessToken(
          req.body.refreshToken
        );

    res.status(200).json(
      result
    );

  } catch (error) {

    res.status(400).json({
      message:error.message
    });

  }

};

module.exports = {
  register,
  login,
  profile,
  changePassword,
  refreshToken
};