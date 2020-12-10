import {
  createLogger as createWinstonLogger,
  Logger,
  transports,
} from 'winston';

export default function createLogger(name?: string, logLevel?: string): Logger {
  return createWinstonLogger({
    exitOnError: false,
    transports: [
      new transports.Console({
        handleExceptions: true,
        level: logLevel,
        silent: !logLevel,
      }),
    ],
    ...(name && {
      defaultMeta: {
        service: name,
      },
    }),
  });
}
