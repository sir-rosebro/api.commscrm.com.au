import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { update } from "./userService";
import { User } from "../models";

const signUp = async (data) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  const { id, ...customerData } = { ...data, password: hashedPassword };
  let user = new User(customerData);
  return user.save();
}

const generateResetPasswordToken = async (id, password, email, createdAt) => {
    const sercret = `${password}-${createdAt.getTime()}`;
    const resetPasswordToken = jwt.sign(
        {email, id},
        sercret,
        { expiresIn: '1h' }
      );
    await update({id, resetPasswordToken});
    return resetPasswordToken;   
}

export {
  generateResetPasswordToken,
  signUp
};