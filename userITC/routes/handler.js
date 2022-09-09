const { User } = require("../models");
const bcrypt = require("bcrypt");

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
        data: user});
  },
  handlerPutUser: async (req, res) => {
    const { id } = req.params;
    const { fullName, shortName, biodata, angkatan, jabatan } = req.body;
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
        });
    }
  },
  handlerDeleteUser: async (req, res) => {
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
};