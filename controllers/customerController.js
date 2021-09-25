import { customerService } from "../services";

const create = async (req, res) => {
  try {
    const existingUser = await customerService.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(500).send({
        status: "ERROR",
        message: "This email address is already used.",
      });
    }

    const resource = await customerService.add(req.body);

    const { dataValues } = await customerService.findOne({ id: resource.id });
    return res.status(200).send({
      status: "OK",
      user: {
        id: dataValues.id,
        email: dataValues.email,
        businessName: dataValues.businessName,
        contactName: dataValues.businessName,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      status: "ERROR",
      message: "There was problem registering customer.",
    });
  }
};

export { create };
