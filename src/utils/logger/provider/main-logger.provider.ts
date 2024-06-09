import { ConsoleLogger, Injectable } from '@nestjs/common';
/**
 * Class for describing implementation of a logger service
 *
 * This class will be used to log all the events in the application
 *
 * @example const logger = new MainLogger();
 * logger.log('Hello World');
 */
@Injectable()
export class MainLogger extends ConsoleLogger {}
