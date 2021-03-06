import bcrypt from "bcrypt";
import { User } from "../models";

const add = (data) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);
  const { id, ...userData } = { ...data, password: hashedPassword };
  let user = new User(userData);
  return user.save();
};

const findOne = (filter) => {
  return User.findOne({
    where: filter,
  });
};

const getAll = async (condition, limit, offset) => {
  return await User.findAndCountAll({
    unique: true,
    where: condition,
    limit,
    offset
  });
};

const update = async (data) => {
  const { dataValues } = await findOne({ id: data.id });

  return User.update(
    { ...dataValues, ...data },
    { where: { id: data.id } }
  );
};

const del = async (id) => {
  return await User.destroy({ where: { id } });
};

export { add, findOne, getAll, update, del };
