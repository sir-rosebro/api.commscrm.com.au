const nodemailer = require("nodemailer");

const sendEmail = async (mailObj) => {
   const { from, to, subject, message } = mailObj;
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: from, 
        to: to, 
        subject: subject, 
        text: message, 
    };
    
    await transporter.sendMail(mailOptions);
}

export default sendEmail;