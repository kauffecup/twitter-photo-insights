import express              from 'express';
import twitterLinkScraper   from './twitterLinkScraper';
import downloaderAndZipper  from './downloaderAndZipper';
import visualInsights       from './visualInsights';
import formatWatsonResponse from './formatWatsonResponse';

var router = express.Router();

/* GET visual insights */
var myCache = {};
router.get('/visualinsights', (req, res) => {
  var screenName = req.query.screenname;
  if (myCache[screenName]) {
    res.json(myCache[screenName]);
  } else {
    // 4 steps:
    //   1. get the image links from the twitter link scraper
    //   2. download the images and zip them up
    //   3. send the zip on over to our boy watson
    //   4. format watson's response into a sensical JSON object
    twitterLinkScraper(screenName).then(links =>
      downloaderAndZipper(links, screenName)
    ).then(zipPath => 
      visualInsights(zipPath)
    ).then(({summary}) =>
      formatWatsonResponse(summary)
    ).then(response => {
      myCache[screenName] = response;
      res.json(response);
    }).catch(e => {
      res.status(500);
      res.json(e);
    });
  }
});

export default router;
