import { ConnectionOptions, Connection } from '../orm';
export declare const InjectConnection: (connection?: Connection | ConnectionOptions | string) => ParameterDecorator;
export declare const InjectModel: (entity: any) => PropertyDecorator & ParameterDecorator;
export declare const InjectRepository: (entity: any) => PropertyDecorator & ParameterDecorator;
