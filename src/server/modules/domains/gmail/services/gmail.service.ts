import { Injectable } from '@nestjs/common';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import nodemailer, { Transporter } from 'nodemailer';
import { NodemailerConfig } from '../../../../configs/nodemailer.config';
import { BASE_URL } from '../../../../../common/enviroments/global-enviroment';

@Injectable()
export class GmailService {
    private readonly transport: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        this.transport = nodemailer.createTransport(NodemailerConfig);
        this.transport.verify((err, success) => {
            if(err) {
                console.log(err);
            } else {
                console.log('[GMAIL_SERVICE] - Успешно подключился к почтовому клиенту');
            }
        });
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

    async registeredMessage(toEmail: string, name: string, token: string): Promise<void> {
        const link = `${BASE_URL}/activate?key=${token}`;

        await this.transport.sendMail({
            from: process.env.GMAIL_USER,
            to: toEmail,
            subject: 'Успешная регистрация на портале',
            html: `
                <div>
                    <div>Добрый день, ${name}! Информируем вас об успешной регистрации на портале.</div>
                    <div>Для активации аккаунта перейдите по ссыле:  </div>
                    <a href="${link}">Активировать аккаунт</a>
                </div>
            `
        });
    }
}