const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const createModelUser = (Sequelize, DataTypes) => {
  const User = Sequelize.define('User', {
    // Model attributes are defined here
  
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email : {
      type: DataTypes.STRING,
    },
    password : {
      type: DataTypes.STRING,
    },
    fullName : {
      type: DataTypes.STRING,
    },
    shortName : {
      type: DataTypes.STRING,
    },
    photo :{
      type: DataTypes.STRING,
      allowNull: true,
    },
    biodata : {
      type: DataTypes.STRING,
    },
    angkatan : {
      type: DataTypes.INTEGER,
    },
    jabatan : {
      type: DataTypes.STRING,
    },
    createdAt :{
      type: DataTypes.DATE,
    },
    updatedAt : {
      type: DataTypes.DATE,
    },
            
  }, {
    // Other model options go here
    tableName: 'users',
  });
  return User;  
}

module.exports = createModelUser;
