"use strict";
module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      password: DataTypes.STRING,
      businessName: DataTypes.STRING,
      contactName: DataTypes.STRING,
      contactNumber: DataTypes.STRING,
      mobile: DataTypes.STRING,
      email: DataTypes.STRING,
      billingAddress: DataTypes.STRING,
      shippingAddress: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      isApproved: DataTypes.BOOLEAN,
      resetPasswordToken: DataTypes.STRING,
      },
      {
        tableName: "customer",
      }
  );

  schema.associate = function (models) {};
  return schema;
};
