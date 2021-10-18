'use strict';
//import bcrypt from 'bcrypt';


const deleteAdminUsers =[
  {
    email: 'admin@commscrm.com.au'
  },
  {
    email: 'admin+1@commscrm.com.au'
  }
];
module.exports = {
  up: async (queryInterface) => {
  //  const password = bcrypt.hashSync('admin', 10);
    const adminUsers = [
      {
        email:'admin@commscrm.com.au',
        password:'admin',
        contactName:'Kevein Petershon',
        isAdmin:true,
        isApproved:true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email:'admin+1@commscrm.com.au',
        contactName:'Brett Lee',
        password:'admin',
        isAdmin:true,
        isApproved:true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('user', adminUsers);
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('user', {[Op.or]: deleteAdminUsers});
  }
};
