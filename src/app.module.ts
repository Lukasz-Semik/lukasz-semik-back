import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseOrmModule } from './database-orm.module';
import { Record } from './entities/record.entity';
import { EnvModule } from './modules/utils/env/env.module';
import { MailsModule } from './modules/utils/mails/mails.module';

@Module({
  imports: [
    DatabaseOrmModule(),
    TypeOrmModule.forFeature([Record]),
    EnvModule,
    MailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
