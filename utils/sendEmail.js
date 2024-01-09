
const { createTransport } = require("nodemailer")
const { LoginOTPEmail } = require("./Templetes/LoginOtpEmail")


const sendEmail = async (to, otp) => {
    const subject = `${otp} is your Swiftfolios OTP`
    const html = LoginOTPEmail(otp);


    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: {
            name: 'Swiftfolios',
            address: process.env.EMAIL_FROM
        },
        to,
        cc: 'niharpatel4444@gmail.com',
        bcc: 'patelnihar39@gmail.com',
        subject,
        text: "text",
        html,
    });
};

module.exports = { sendEmail }
