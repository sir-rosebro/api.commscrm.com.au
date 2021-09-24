import { customerService } from "../services";

const signIn = async(req, res) => {
  try {
    console.log(req.body);
    const {email, password} = req.body;
    const { dataValues } = await customerService.findOne({ email, password });
    return res.status(200).send({
      status: "OK",
      customer: dataValues,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      status: "ERROR",
      message: "Credentials enered are not correct!",
    });
  }
}

export { signIn };