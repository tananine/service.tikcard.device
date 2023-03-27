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
    },
    {
      sequelize,
      modelName: 'DeviceType',
    }
  );
  return DeviceType;
};
