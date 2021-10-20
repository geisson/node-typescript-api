import config, { IConfig } from 'config';
import mongoose, { Mongoose } from 'mongoose';

const dbConfig: IConfig = config.get('App.database');

console.log(dbConfig);

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(dbConfig.get('mongoURL'));

export const close = (): Promise<void> => mongoose.connection.close();
