"use strict";
module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "Upload",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
      },
      path: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.BLOB("long"),
      },
      userId: {
          type:DataTypes.INTEGER
      }
    },
      {
        tableName: "upload",
      }
  );

  schema.associate = function (models) {};
  return schema;
};


//npx sequelize migration:generate --name add-upload-table
//npx sequelize db:migrate 20211008034217-add-upload-table