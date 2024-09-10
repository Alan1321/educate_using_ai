const nodemailer = require('nodemailer');

exports.sendInvitationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'You are invited!',
        text: `You are invited to sign up. Use this link: ${process.env.CLIENT_URL}/signup?token=${token}`
    };

    await transporter.sendMail(mailOptions);
};
