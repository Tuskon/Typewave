'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({

    user_id:{
    type:DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    username:{
    type:DataTypes.STRING,
    allowNull: false,

    }, 
    email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true,

    },  
    password:{
    type:DataTypes.CHAR,
    allowNull: false,

    },  
    points:{
    type:DataTypes.INTEGER,
    allowNull: true,

    },  
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  });
  return Users;
};