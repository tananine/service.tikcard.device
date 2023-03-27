'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scanner extends Model {
    static associate(models) {
      this.belongsTo(models.Device, {
        foreignKey: 'deviceId',
        onDelete: 'CASCADE',
      });
    }
  }
  Scanner.init(
    {
      deviceId: DataTypes.INTEGER,
      key: DataTypes.STRING,
      type: DataTypes.ENUM('primary', 'secondary'),
    },
    {
      sequelize,
      modelName: 'Scanner',
    }
  );
  return Scanner;
};
