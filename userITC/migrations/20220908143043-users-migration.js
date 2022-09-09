'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('users', 
        { 
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          email : Sequelize.STRING,
          password : Sequelize.STRING,
          fullName : Sequelize.STRING,
          shortName : Sequelize.STRING,
          photo : {
            type : Sequelize.STRING,
            allowNull : true,
          },
          biodata : Sequelize.STRING,
          angkatan : Sequelize.INTEGER,
          jabatan : Sequelize.STRING,
          createdAt : Sequelize.DATE,
          updatedAt : Sequelize.DATE
          
        
        });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('users');
  }
};
