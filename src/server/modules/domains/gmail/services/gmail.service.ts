import { Injectable } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer, { Transporter } from 'nodemailer';
import { NodemailerConfig } from '../../../../configs/nodemailer.config';

@Injectable()
export class GmailService {
    private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        this.transport = nodemailer.createTransport(NodemailerConfig);
    }

    async sendHelloMail(toEmail: string): Promise<void> {
        await this.transport.sendMail({
            from: process.env.GMAIL_USER,
            to: toEmail,
            subject: 'Тестовое письмо',
            html: `
                <div>
                    <h1>Тестовое письмецо</h1>
                    <div>Просто тестик</div>
                </div>
            `
        });
    }

    async registeredMessage(toEmail: string, name: string): Promise<void> {
        await this.transport.sendMail({
            from: process.env.GMAIL_USER,
            to: toEmail,
            subject: 'Успешная регистрация на портале',
            html: `
                <div>
                    <div>Добрый день, ${name}! Информируем вас об успешной регистрации на портале.</div>
                </div>
            `
        });
    }
}