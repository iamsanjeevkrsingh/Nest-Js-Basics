import { DataSource } from 'typeorm';
import ormConfig from './typeormconfig';

export default new DataSource(ormConfig);
