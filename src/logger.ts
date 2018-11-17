import * as bunyan from 'bunyan';

module.exports = (() => {
  const streams = [{
    level: 'debug',
    stream: process.stdout,
  }];
  const logger = bunyan.createLogger({
    streams,
    name: 'rd2-animals-api',
    src: true,
  });
  return logger;

})();