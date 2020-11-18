import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { EnvService } from './modules/utils/env/env.service';

export function DatabaseOrmModule(): DynamicModule {
  const envService = new EnvService();
  const config = envService.read();

  return TypeOrmModule.forRoot({
    type: config.DB_TYPE,
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    synchronize: true,
    logging: envService.isDev(),
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  });
}
