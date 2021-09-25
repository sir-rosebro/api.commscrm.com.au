import bcrypt from "bcrypt";
import { Customer } from "../models";

const add = (data) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  const { id, ...customerData } = { ...data, password: hashedPassword };
  let customer = new Customer(customerData);
  return customer.save();
};

const findOne = (filter) => {
  return Customer.findOne({
    where: filter,
  });
};

const getAll = async () => {
  return await Customer.findAndCountAll({
    unique: true,
  });
};

const update = async (data) => {
  const { dataValues } = await findOne({ id: data.id });

  return Customer.update(
    { ...dataValues, ...data },
    { where: { id: data.id } }
  );
};

const del = async (id) => {
  return await Customer.destroy({ where: { id } });
};

export { add, findOne, getAll, update, del };
