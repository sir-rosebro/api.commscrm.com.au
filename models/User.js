"use strict";
module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "User",
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
      isAdmin: DataTypes.BOOLEAN,
      profileImg: DataTypes.STRING,
      },
      {
        tableName: "user",
      }
  );

  schema.associate = function (models) {};
  return schema;
};
