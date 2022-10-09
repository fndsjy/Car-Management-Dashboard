'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cars.init({
    car_name: DataTypes.STRING,
    rent_cost: DataTypes.INTEGER,
    car_size: DataTypes.STRING,
    car_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};