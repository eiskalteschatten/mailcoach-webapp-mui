import cron from 'node-cron';

import { refreshAllFeeds } from './helpers/feedsHelper';

const times = {
  refresh: '0 * * * *' // once an hour at the top of the hour
};

export function setupCronjobs(): void {
  // Feed Refresh
  console.log('Setting up feed refresh cronjob for', times.refresh);
  cron.schedule(times.refresh, refreshAllFeeds);
}

export default setupCronjobs;
