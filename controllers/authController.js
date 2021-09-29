import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from '../helper/sendMail';

import { customerService, authService } from "../services";


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUserWithEmail = await customerService.findOne({ email });

    if (!existingUserWithEmail) {
      return res.status(500).send({
        status: "ERROR",
        message: "Could not find the user with email address !",
      });
    }

    if (!existingUserWithEmail.isApproved) {
      return res.status(500).send({
        status: "ERROR",
        message: "Your account is not approved yet!",
      });
    }

    const isValidPassword = bcrypt.compareSync(
      password,
      existingUserWithEmail.password
    );

    if (!isValidPassword) {
      return res.status(500).send({
        status: "ERROR",
        message: "Invalid login credentials!",
      });
    }

    const token = jwt.sign(
      {
        id: existingUserWithEmail.id,
        email: existingUserWithEmail.email,
      },
      process.env.TOKEN_SECRECT,
      { expiresIn: 60 * 60 * 60 * 24 * 7 }
    );

    return res.status(200).send({
      status: "OK",
      token: token,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      status: "ERROR",
      message: "Credentials enered are not correct!",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const {email} = req.body;
    const existingUserWithEmail = await customerService.findOne({ email });
    const {id, password, createdAt} = existingUserWithEmail;
    if (!existingUserWithEmail) {
      return res.status(500).send({
        status: "ERROR",
        message: "Could not find the user with email address !",
      });
    } else {
      const resetPasswordToken =  await authService.generateResetPasswordToken(id, password, email, createdAt);
      const mailObj = {
        to:email,
        template:'resetPassword',
        locals:{
          contactName:existingUserWithEmail.contactName,
          host:process.env.CUSTOMER_FRONTEND_HOST,
          resetToken:resetPasswordToken,
          email:existingUserWithEmail.email
        }
      };
      await sendMail(mailObj);
      return res.status(200).send({
        status: "OK",
        message:'Password reset link has been sent to your email account. Please check your mail inbox.',
      });
    }
  } catch(error) {
    console.log({ error });
    return res.status(500).send({
      status: "ERROR",
      message: "Something has gone wrong!!",
    });
  }
}


const resetPassword = async (req, res) => {
  try {
    const {email, newPassword, token} = req.body;
    const existingUserWithEmail = await customerService.findOne({ email });

    if (!existingUserWithEmail) {
      return res.status(500).send({
        status: "ERROR",
        message: "Could not find the user with email address !",
      });
    }
    const {id, password, resetPasswordToken, createdAt} = existingUserWithEmail;

    if(resetPasswordToken !== token) {
      return res.status(500).send({
        status: "ERROR",
        message: "The password reset token has expired!!",
      });
    }
 
    const secret = `${password}-${createdAt.getTime()}`;

    jwt.verify(token, secret, (err, decoded) => {
      if(err) {
        return res.status(500).send({
          status: "ERROR",
          message: "The password reset token has expired!!",
        });
      }
    })
    
    const newHashedPassword =  bcrypt.hashSync(newPassword, 10)
    await customerService.update({id, password:newHashedPassword, resetPasswordToken:null});
    
    return res.status(200).send({
      status: "OK",
      message:'Your password is changed, please login with your new password.',
    });

  } catch(error) {
    console.log({ error });
    return res.status(500).send({
      status: "ERROR",
      message: "Something has gone wrong!!",
    });
  }
}



export { signIn, forgotPassword, resetPassword };
