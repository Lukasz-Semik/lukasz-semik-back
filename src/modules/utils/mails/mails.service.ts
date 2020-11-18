import { Injectable } from '@nestjs/common';
import { MailData } from '@sendgrid/helpers/classes/mail';
import * as sgMail from '@sendgrid/mail';

import { EnvService } from '../env/env.service';

@Injectable()
export class MailsService {
  private apiKey = this.envService.get<string>('SENDGRID_API_KEY');

  constructor(private envService: EnvService) {}

  private setApiKey() {
    sgMail.setApiKey(this.apiKey);
  }

  private sendEmail(msg: MailData & { html: string }) {
    if (!this.envService.isTest()) {
      // tslint:disable no-console
      sgMail.send(msg).catch(err => console.log(err));
    }
  }

  public sendContactEmail(userEmail: string, content: string): void {
    this.setApiKey();

    const msg = {
      to: 'djpluki@gmail.com',
      from: 'lukasz-semik-app@support.com',
      subject: 'Lukasz Semik app - contact requested',
      html: `
        <div>
          <p>User email: ${userEmail}
          <br />
          <p>${content}</p>
        </div>
      `,
    };

    this.sendEmail(msg);
  }
}
