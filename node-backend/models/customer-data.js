'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CustomerData.init({
    placeHolder: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CustomerData',
  });
  return CustomerData;
};