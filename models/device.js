'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    static associate(models) {
      this.hasMany(models.Scanner, {
        foreignKey: 'deviceId',
      });
      this.belongsTo(models.DeviceType, {
        foreignKey: 'deviceTypeId',
        onDelete: 'CASCADE',
      });
    }
  }
  Device.init(
    {
      accountId: DataTypes.INTEGER,
      deviceTypeId: DataTypes.INTEGER,
      tikDeviceId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Device',
    }
  );
  return Device;
};
