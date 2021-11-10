import { userService } from "../services";
import sendMail from '../helper/sendMail';


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
    const mailObj = {
      to:req.body.email,
      template:'registerCustomer',
      locals:{
        contactName:req.body.contactName,
        host:process.env.CUSTOMER_FRONTEND_HOST
      }
    };
    await sendMail(mailObj);
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

const update = async (req, res) => {
 
  try {
    const existingUser = await userService.findOne({
      id: req.params.id,
    });
    if (!existingUser) {
      return res.status(500).send({
        status: "ERROR",
        message: "The account with this email does not exist.",
      });
    }
    await userService.update(req.body.fieldsValue);
    const { dataValues } = await userService.findOne({ id: existingUser.id });
    return res.status(200).send({
      status: "OK",
      user: {
        id: dataValues.id,
        email: dataValues.email,
        contactName: dataValues.contactName,
        billingAddress: dataValues.billingAddress,
      },
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
      status: "ERROR",
      message: "There was problem updating customer.",
    });
  }
};

const getCustomers = async (req, res) => {
 
  try {
    const {page, size, title} = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const { limit, offset } = getPagination(page, size);
    const { count, rows} = await userService.getAll(condition, limit, offset);
    const customers = rows.map( row => {
      const {id, email, contactName, billingAddress, isApproved} = row;
      return {
        id,
        email,
        contactName,
        billingAddress,
        isApproved
      };
  });
   const pagingData = getPagingData(count, customers, page, limit);
  res.status(200).send({
    status: "OK", 
    ...pagingData,
  });
    
  } catch (error) {
    console.log({ error });
    res.status(500).send({
      status: "ERROR",
      message: "There is problem fetching customers data.",
    });
  }
};


const approveCustomer = async(req, res) => {

  try {
    const customerId = req.params.id;
    await userService.update({id:customerId, isApproved:true});
  
    return res.status(200).send({
      status: "OK",
      customerId, 
    });
      
    } catch (error) {
      console.log({ error });
      return res.status(500).send({
        status: "ERROR",
        message: "There was problem approving customer.",
      });
    }
}

const deleteCustomer = async(req, res) => {

  try {
    const customerId = req.params.id;
    await userService.del(customerId);
  
    return res.status(200).send({
      status: "OK",
      customerId, 
    });
      
    } catch (error) {
      console.log({ error });
      return res.status(500).send({
        status: "ERROR",
        message: "There was problem deleting customer.",
      });
    }
}

const getPagination = (page, size) => {
  const limit = size ? size : 3;
  const offset = page ? (page-1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (total, customers, page, pageSize) => {
  const current = page ? page : 0;
  //const totalPage = Math.ceil(totalItems / pageSize); //TOTAL PAGES
  return {
    customers,
    pagination:{
      current,
      pageSize,
      total
    }
  }
}


export { 
  create, 
  getCustomers, 
  approveCustomer,
  deleteCustomer,
  update 
};



