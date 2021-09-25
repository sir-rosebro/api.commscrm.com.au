import bcrypt from "bcrypt";
import { Customer } from "../models";
import { update } from "./customerService";

const generateResetPasswordToken = async (email, id) => {
    const sercret = `${id}_${email}_${new Date().getTime()}`;
    const resetPasswordToken = jwt.sign(
        {email, id},
        sercret,
        { expiresIn: 60 * 60 }
      );
    await update({id, resetPasswordToken});
    return resetPasswordToken;   
}

export {generateResetPasswordToken};