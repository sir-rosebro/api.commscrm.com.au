
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("customer", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
      },
      businessName: {
        type:Sequelize.STRING
      },
      contactName: {
        type: Sequelize.STRING,
      },
      contactNumber: {
        type: Sequelize.STRING,
      },
      mobile: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      billingAddress: {
        type: Sequelize.STRING,
      },
      shippingAddress: {
        type: Sequelize.STRING,
      },
      accountNumber: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("customer");
  },
};