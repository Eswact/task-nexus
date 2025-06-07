import IUser from '../models/user/interface';
import fs from 'fs';
import path from 'path';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
    auth: {
      user: 'renterensmurf@gmail.com',
      pass: 'utgwplwftqgzoejt'
    }
});

const sendVerificationMail: Function = async (user: IUser, verificationUrl: string) => {
  const templatePath = path.join(__dirname, 'mail-template.html');
  let template = fs.readFileSync(templatePath, 'utf8');
  template = template.replace('{{username}}', user.username);
  template = template.replace('{{verificationUrl}}', verificationUrl);

  const mailOptions = {
    from: '"TaskMG" <renterensmurf@gmail.com>',
    to: user.mail,
    subject: 'Please confirm your email address',
    html: template,
  };

  await transporter.sendMail(mailOptions);
};

export { sendVerificationMail };
