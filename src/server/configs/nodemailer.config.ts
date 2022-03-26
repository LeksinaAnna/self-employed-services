import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as dotenv from 'dotenv';
dotenv.config();

export const NodemailerConfig: SMTPTransport.Options = {
    host: process.env.GMAIL_HOST,
    port: Number(process.env.GMAIL_PORT),
    secure: false,
    auth: {
        type: 'login',
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
}