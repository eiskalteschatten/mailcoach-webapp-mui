import authModels from '../src/modules/auth/models';
import rssModels from '../src/modules/rss/models';

export default {
  ...authModels,
  ...rssModels
};
