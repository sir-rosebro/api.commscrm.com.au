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
   
  const users = await userService.getAll();
  const customers = (users.rows).filter( user => !user.isAdmin);
  const customerfilteredData = customers.map( customer => {
    const {email, contactName, billingAddress, isApproved} = customer;
    return (
      {
        email,
        name:contactName,
        address:billingAddress,
        isApproved
      }
    )
  });
  
  return res.status(200).send({
    status: "OK",
    customers:customerfilteredData, 
  });
    
  } catch (error) {
    console.log({ error });
    return res.status(500).send({
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
