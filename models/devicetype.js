'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeviceType extends Model {
    static associate(models) {
      this.hasMany(models.Device, {
        foreignKey: 'deviceTypeId',
      });
    }
  }
  DeviceType.init(
    {
      name: DataTypes.STRING,
      typeScan: DataTypes.ENUM('single', 'double'),
    },
    {
      sequelize,
      modelName: 'DeviceType',
    }
  );
  return DeviceType;
};
