import bcrypt from "bcrypt";
import { update } from "./customerService";
import jwt from 'jsonwebtoken';

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

export {generateResetPasswordToken};