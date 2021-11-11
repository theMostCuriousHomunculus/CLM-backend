import { createTransport } from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transporter = createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY
    }
  })
);

export default transporter;
