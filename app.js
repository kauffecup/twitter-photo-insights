import twitterLinkScraper  from './twitterLinkScraper';
import downloaderAndZipper from './downloaderAndZipper';

/** The momma function: for a twitter screen name, get and zip their images */
function getAndZipImages(screenName) {
  return twitterLinkScraper(screenName).then(links => {
    return downloaderAndZipper(links, screenName);
  });
}
