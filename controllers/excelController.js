import xlsx from 'xlsx';
import path from 'path';

import { userService } from "../services";


const download = async (req, res) => {

  const users = await userService.getAll();
  const filterdUserData = (users.rows).map( (user) => ({
    name:user.contactName,
    email:user.email,
    status: user.isApproved? 'approved':'pending'
  }));

  var userWS = xlsx.utils.json_to_sheet(filterdUserData);
  var wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, userWS, 'user');
  xlsx.writeFile(wb, 'xlsx/book.xlsx');
  
};

export {
  download
}