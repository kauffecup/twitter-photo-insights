import express from 'express';
import twitterLinkScraper  from './twitterLinkScraper';
import downloaderAndZipper from './downloaderAndZipper';
import visualInsights      from './visualInsights';

var router = express.Router();

/* GET visual insights */
router.get('/visualinsights', (req, res) => {
  var screenName = req.query.screenname;
  // 3 steps:
  //   1. get the image links from the twitter link scraper
  //   2. download the images and zip them up
  //   3. send the zip on over to our boy watson and return his response
  twitterLinkScraper(screenName).then(links =>
    downloaderAndZipper(links, screenName)
  ).then(zipPath => 
    visualInsights(zipPath)
  ).then(({summary}) => {
    res.json(summary);
  }).catch(e => {
    res.status(500);
    res.json(e);
  });
});

export default router;
