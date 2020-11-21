import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';
import { MailsService } from './modules/utils/mails/mails.service';

interface CreateRecordPostOptions {
  value: number;
}

interface SendEmailPostOptions {
  email: string;
  content: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private mailsService: MailsService
  ) {}

  @Get('all')
  async getRecords(@Res() res: Response) {
    const records = await this.appService.getAllRecords();

    return res.status(HttpStatus.OK).json({
      msg: 'All records',
      data: {
        records,
      },
    });
  }

  @Get('wake-up')
  async wakeUp(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({
      msg: 'Server got shot',
    });
  }

  @Post('create-record')
  async createRecord(
    @Body() body: CreateRecordPostOptions,
    @Res() res: Response
  ): Promise<Response> {
    const newRanking = await this.appService.createRecord(body.value);

    return res.status(HttpStatus.CREATED).json({
      msg: 'Record saved successfully',
      data: {
        ranking: newRanking,
      },
    });
  }

  @Post('send-email')
  sendEmail(@Body() body: SendEmailPostOptions, @Res() res: Response) {
    this.mailsService.sendContactEmail(body.email, body.content);

    return res.status(HttpStatus.OK).json({ msg: 'Email successfully sent' });
  }
}
