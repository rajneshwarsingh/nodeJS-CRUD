/*
 * @file: logger/index.js
 * @description: It contain error and info log functions.
 * @author: Rajneshwar Singh
 */

import { v4 as uuidv4 } from 'uuid';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import appRoot from 'app-root-path';
import namespace from 'continuation-local-storage';
const loggerNamespace = namespace.getNamespace('logger');
const logsPath = `${appRoot}/lib/logger/logs/`;

const fileFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    let log = '';
    try {
      const logId = loggerNamespace && loggerNamespace.get('logId') ? loggerNamespace.get('logId') : uuidv4();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    } catch (error) {
      console.log('Error @ fileFormat @ logger ', error);
    } finally {
      return log;
    }
  }),
);

const info = createLogger({
  level: 'info',
  format: fileFormat,
  transports: [
    new DailyRotateFile({
      level: 'info',
      filename: `${logsPath}/info-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      colorize: false,
    }),
  ],
});

const error = createLogger({
  level: 'error',
  format: fileFormat,
  transports: [
    new DailyRotateFile({
      level: 'error',
      filename: `${logsPath}/error-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      colorize: false,
    }),
  ],
});

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    let log = '';
    try {
      const logId = loggerNamespace && loggerNamespace.get('logId') ? loggerNamespace.get('logId') : uuidv4();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    } catch (error) {
      console.log('Error @ fileFormat @ logger ', error);
    } finally {
      return log;
    }
  }),
);

if (process.env.NODE_ENV !== 'production') {
  info.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
  error.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
}

const logger = {
  info: async (msg, ...args) => {
    info.info(msg, ...args);
  },
  error: async (msg, ...args) => {
    error.error(msg, ...args);
  },
};
export default logger;
