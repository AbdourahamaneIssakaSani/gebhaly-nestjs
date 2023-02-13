import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('EMAIL_HOST'),
      port: configService.get('EMAIL_PORT'),
      secure: true,
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  /**
   * Sends an email.
   * @param {string} to - The email address of the recipient.
   * @param {string} subject - The subject of the email.
   * @param {string} text - The body text of the email.
   * @returns {Promise<nodemailer.SentMessageInfo>} A Promise that resolves when the email is sent.
   */
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions: nodemailer.SendMailOptions = {
      from: 'Abissa <hello@abissa.tech>',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
