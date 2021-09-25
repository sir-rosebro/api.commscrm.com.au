import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { customerService } from "../services";

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

export { signIn };
