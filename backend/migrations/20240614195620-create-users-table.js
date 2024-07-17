'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('Users',{
      user_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      password: {
        type: Sequelize.CHAR(250),
        allowNull: false
      },
      points:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull:false,
        type:Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('Users')
  }
};
