import { Inject } from '@nestjs/common';
import { getModelToken, getRepositoryToken, getConnectionToken } from './cassandra-orm.utils';
import { ConnectionOptions, Connection } from '../orm';

export const InjectConnection: (connection?: Connection | ConnectionOptions | string) => ParameterDecorator = (
  connection?: Connection | ConnectionOptions | string,
) => Inject(getConnectionToken(connection));

export const InjectModel: (entity: any) => PropertyDecorator & ParameterDecorator = (entity: any) => Inject(getModelToken(entity));

export const InjectRepository: (entity: any) => PropertyDecorator & ParameterDecorator = (entity: any) =>
  Inject(getRepositoryToken(entity));
