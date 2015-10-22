import Promise       from 'bluebird';
import Twitter       from 'twitter';
import twitterConfig from './TWITTER_CONFIG.json';

const MAX_PAGES = 1;
const COUNT = 200;
const MAX_IMAGES = 200;

var twitter = new Twitter(twitterConfig);

/** A wrapper for twitter.get because I like promises and they apparently don't */
function getAsync(endpoint, args) {
  return new Promise((resolve, reject) => {
    twitter.get(endpoint, args, (e, tweets, response) => {
      if (e) { reject(e); }
      else { resolve(tweets); }
    });
  })
}

/** Get a "page" of tweets for a screen name */
function getPage(screenName, sinceID) {
  var params = {
    screen_name: screenName,
    since_id: sinceID,
    count: COUNT
  }
  if (!sinceID) delete params.since_id;
  return getAsync('statuses/user_timeline', params);
}

/** From the tweets returned, extract the links of images into an array */
function extractLinks(tweets) {
  var picLinks = [];
  if (tweets && tweets.length) {
    for (var {entities} of tweets) {
      if (entities.media) {
        for (var {media_url} of entities.media) {
          picLinks.push(media_url);
        }
      }
    }
  }
  return picLinks;
}

/** Recurseively get the next page until our iteration is >= MAX_PAGES, or
  * we have the MAX_IMAGES number of images. When that happens resolve */
function getLinksRecurse(screenName, tweets, links, iteration, resolve, reject) {
  iteration = iteration || 0;
  links = links.concat(extractLinks(tweets));
  if (iteration >= MAX_PAGES || (tweets.length < COUNT && iteration > 0) || links.length >= MAX_IMAGES) {
    return resolve(links.slice(0, MAX_IMAGES));
  } else {
    var sinceID = tweets && tweets.length ? tweets[tweets.length - 1].id : null;
    getPage(screenName, sinceID).then(tweets => {
      getLinksRecurse(screenName, tweets, links, ++iteration, resolve, reject);
    }).catch(e => reject(e));
  }
}

/** Return a promise that resolves with the links from MAX_PAGES pages of tweets for a screen name */
export default function getAlotOfLinks(screenName) {
  return new Promise((resolve, reject) => {
    getLinksRecurse(screenName, [], [], 0, resolve, reject)
  });
}
