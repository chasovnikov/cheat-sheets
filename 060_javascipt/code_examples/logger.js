'use strict';

// Вывод разноцветных надписей в консоль

const logger = (kind) => {
  const color = logger.colors[kind] || logger.colors.info;
  return (s) => {
    const date = new Date().toISOString();
    console.log(color + date + '\t' + s);
  };
};

logger.colors = {
  warning: '\x1b[1;33m', // yellow
  error: '\x1b[0;31m', // red
  info: '\x1b[1;37m', // white
};

// Usage

const warning = logger('warning');
const error = logger('error');
const debug = logger('debug');
const slow = logger('slow');

slow('I am slow logger');
warning('Hello');
error('World');
debug('Bye!');

// Тоже самое через классы

class Logger {
  constructor(kind) {
    this.color = Logger.colors[kind] || Logger.colors.info;
  }

  log(s) {
    const date = new Date().toISOString();
    console.log(this.color + date + '\t' + s);
  }
}

Logger.colors = {
  warning: '\x1b[1;33m',
  error: '\x1b[0;31m',
  info: '\x1b[1;37m',
};

// Usage

const warning1 = new Logger('warning');
const error1 = new Logger('error');
const debug1 = new Logger('debug');
const slow1 = new Logger('slow');

slow.log('I am slow logger');
warning.log('Hello');
error.log('World');
debug.log('Bye!');
