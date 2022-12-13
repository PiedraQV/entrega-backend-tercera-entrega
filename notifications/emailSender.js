const {createTransport}= require('nodemailer');
const logger= require('../logguer/logguer');
const dotenv = require ('dotenv');

dotenv.config({path: './../.env' });


const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const emailOptions = (emailSubject, htmlTemplates) => {
    return {
        from: process.env.EMAIL_ACCOUNT,
        to: ["deangelo.willms46@ethereal.email"],
        subject: emailSubject,
        html: htmlTemplates
    }
}

const htmlNewUserTemplate = (id, date) => {
    return `
    <h2>¡Nuevo usuario Creado!</h2>
    <p>Se ha creado un nuevo usuario a través de la API</p>
    <ul>
        <li><strong>UUID:</strong> ${id}</li>
        <li><strong>FECHA:</strong> ${date}</li>
    </ul>
    `
};

const sendGmail = async (subject, htmlTemplates) =>{
    try {
        const mailOptions = emailOptions(
            subject,
            htmlTemplates
        );
        
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent`)
    } catch (error) {
        logger.error(error);
    }
}

module.exports = {htmlNewUserTemplate, sendGmail}

