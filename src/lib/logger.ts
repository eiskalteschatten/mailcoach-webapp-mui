import { getLogger } from 'log4js';

const logger = getLogger();
logger.level = process.env.NODE_ENV === 'development' ? 'all': 'debug';

export default logger;
