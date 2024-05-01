const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '3c2998b2c61512',
    pass: 'd1b3937857a07d',
  },
});

const sendMailVerify = async (email, subject, html) => {
  let mailOptions = {
    from: 'admin@gmail.com',
    to: email,
    subject: subject,
    html: html,
  };

  transport.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error occurs');
      return console.log(err.message);
    }
    console.log('Email sent!!!');
  });
};

module.exports = sendMailVerify;
