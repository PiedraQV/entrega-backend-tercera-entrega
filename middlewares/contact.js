import { createTransport } from 'nodemailer';
const TEST_MAIL = 'piedraqv@gmail.com'
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'deangelo.willms46@ethereal.email',
        pass: '69AusuSPgRCV6FZVat'
    }
});