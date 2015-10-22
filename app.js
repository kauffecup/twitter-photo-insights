import twitterLinkScraper  from './twitterLinkScraper';
import downloaderAndZipper from './downloaderAndZipper';
import visualInsights      from './visualInsights';

/** The momma function: for a twitter screen name, get and zip their images,
  * then send the zip off to Watson for some fun times. */
function getZipAndAnalyzeImages(screenName) {
  return twitterLinkScraper(screenName).then(links =>
    downloaderAndZipper(links, screenName)
  ).then(zipPath => 
    visualInsights(zipPath)
  );
}

/** EXAMPLE ON HOW TO USE */
// getZipAndAnalyzeImages('kauffecup').then(({summary}) => {
//   console.log(summary);
// }).catch(e => {
//   console.error(e);
// });
