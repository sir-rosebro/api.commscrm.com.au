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


const getCustomers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = parseInt(req.query.size) || 3;
    const search = req.query.search || '';

    const skip = page * size - size;

    const users = await userService.getAll();
    const customers = (users.rows).filter( user => !user.isAdmin && (user.contactName).search(search) !== -1);

    const result = customers.splice(skip, skip+size);
   
    const customerfilteredData = result.map( customer => {
      const {id, email, contactName, billingAddress, isApproved} = customer;
      return {
        id,
        email,
        name:contactName,
        address:billingAddress,
        isApproved
      };
    });
  res.status(200).send({
    status: "OK",
    customers:customerfilteredData, 
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
export { create, getCustomers, approveCustomer };


// const getPagingData = (data, page, limit) => {
//   const { count: totalItems, rows: tutorials } = data;
//   const currentPage = page ? +page : 0;
//   const totalPages = Math.ceil(totalItems / limit);

//   return { totalItems, tutorials, totalPages, currentPage };
// }

// const getPagination = (page, size) => {
//   const limit = size ? +size : 3;
//   const offset = page ? page * limit : 0;

//   return { limit, offset };
// };