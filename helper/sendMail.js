import nodemailer from "nodemailer";
import Email from 'email-templates';

const email = new Email({
    message: {
        from: process.env.SEND_EMAIL,
        name:process.env.SEND_EMAIL_NAME,
      },
    send:true,
    transport: nodemailer.createTransport({
        service:'gmail',
        // host: process.env.MAIL_HOST,
        // port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }),
});

const sendEmail = async ({template, to, locals}) => {

    return  await email.send({
        template,
        locals,
        message: {
            to
        }
    });
}

export default sendEmail;