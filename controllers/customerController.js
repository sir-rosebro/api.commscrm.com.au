import { customerService } from "../services";

const create = async (req, res) => {
  try {

    const resource = await customerService.add(req.body);

    const { dataValues } = await customerService.findOne({ id: resource.id });
    return res.status(200).send({
      status: "OK",
      customer: dataValues,
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