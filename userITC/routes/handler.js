const { User } = require("../models");
const bcrypt = require("bcrypt");
const {validateUserCreatePayload,
  validateUserUpdatePayload,
  validateUserLoginPayload,
  validateUserRegisterPayload,
  } = require('../utility/validator');

const {generateAccessToken} = require('../utility/TokenManager');  

module.exports = {
  handlerGetUser: async (req, res) => {
    const users = await User.findAll();
    const usersData = users.map((user) => {
        const {id,fullName,shortName,photo} = user;
        return {
            id,
            fullName,
            shortName,
            photo,
        }
    });
   
    res.status(200).json({
        status: 'success',
        message: 'Successfully get all users',
        data: usersData});
  },

  handlerGetUserById: async (req,res) => {
    const {id} = req.params;
    const user = await User.findByPk(id);

    if(!user){
        res.status(404).json({
            message: 'User not found',
        });
        return;     
    }
    res.status(200).json({
        status: 'success',
        message: 'Successfully get user by id',
        data: user}); 
  },
  handlerPostUser: async (req, res) => {
    const { email, password, fullName, shortName, photo,biodata,angkatan,jabatan } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    validateUserCreatePayload(req.body);

    const user = await User.create({
      email,
      password: hashPassword,
      fullName,
      shortName,
      jabatan,
      photo,
      biodata,
      angkatan,
    });
    res.status(200).json({
        status: 'success',
        message: 'Successfully create a user',
        data: {
          email,
          fullName,
          shortName,
          jabatan,
          photo,
          biodata,
          angkatan,
        }});
  },
  handlerPutUser: async (req, res) => {
    const { id } = req.params;
    const { fullName, shortName, biodata, angkatan, jabatan } = req.body;

    validateUserUpdatePayload({id, ...req.body});

    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    } else {
      await user.update({
        fullName,
        shortName,
        biodata,
        angkatan,
        jabatan,
        updatedAt: Date.now(),

      });
      res.status(200).json({
        status: 'success',
        message: 'Successfully update a user',
        data: {
          fullName,
          shortName,
          biodata,
          angkatan,
          jabatan,
        },
        });
    }
  },
  handlerDeleteUser: async (req, res, next) => {
    try{
      const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    } else {
      await user.destroy();
      res.status(200).json({
        status: 'success',
        message: 'Successfully delete a user',
        });
      }
    }
    catch(err){
      next(err);
    }
  },
  handlerLoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      validateUserLoginPayload(req.body);

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordValid = bcrypt.compareSync(password, user.password);
      if (!passwordValid) {
        throw new Error("Invalid password");
      }

      const accessToken = generateAccessToken({
        id: user.id,
        name: user.fullName,
        jabatan: user.jabatan,
        email: user.email,
      });

      res.status(200).json({
        status: "success",
        message: "Login success",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  handlerRegisterUser: async (req, res) => {
    const { email, password, fullName, shortName, photo,biodata,angkatan,jabatan } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    validateUserCreatePayload(req.body);

    const user = await User.create({
      email,
      password: hashPassword,
      fullName,
      shortName,
      jabatan,
      photo,
      biodata,
      angkatan,
    });
    res.status(200).json({
        status: 'success',
        message: 'Successfully create a user',
        data: {
          id: user.id,
          email,
          fullName,
          shortName,
          jabatan,
          photo,
          biodata,
          angkatan,
        }});
  },
};