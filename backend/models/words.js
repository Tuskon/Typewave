'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Words.init({
    word_id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, 
    word:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Words',
    tableName: 'words',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
  });
  return Words;
};