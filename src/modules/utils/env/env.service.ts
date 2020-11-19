import * as dotenv from 'dotenv';
import * as fs from 'fs';

export interface EnvData {
  // application
  APP_ENV: string;
  APP_DEBUG: boolean;
  APP_SECRET: string;
  SENDGRID_API_KEY: string;
  // database
  DB_TYPE: 'postgres';
  DB_HOST?: string;
  DB_NAME: string;
  DB_PORT?: number;
  DB_USER: string;
  DB_PASSWORD: string;
}

export class EnvService {
  private envData: EnvData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';

    const data: any =
      environment === 'production'
        ? process.env
        : dotenv.parse(fs.readFileSync(`${environment}.env`));

    data.APP_ENV = environment;
    data.APP_DEBUG = data.APP_DEBUG === 'true';
    data.DB_PORT = parseInt(process.env.DB_PORT, 0);

    this.envData = data as EnvData;
  }

  read(): EnvData {
    return this.envData;
  }

  get<T>(key: string) {
    return this.read()[key] as T;
  }

  isDev(): boolean {
    return this.envData.APP_ENV === 'development';
  }

  isProd(): boolean {
    return this.envData.APP_ENV === 'production';
  }

  isTest(): boolean {
    return this.envData.APP_ENV === 'test';
  }
}
