import watson  from 'watson-developer-cloud';
import fs      from 'fs';
import Promise from 'bluebird';

// get these from either the environment variable or a json file
var vcapServices = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : require('./VCAP_SERVICES.json');

// build the credentials object from vcap services
var visualCredentials = vcapServices.visual_insights[0].credentials;
visualCredentials.version = 'v1';

// initialize the tone analyzer
var visualInsights = watson.visual_insights(visualCredentials);

/**
 * Our export function! Given a filepath to a zip file
 * that contains images, hand 'em off to watson. Returns
 * a promise that resolves with watson's response.
 */
export default function getVisualInsights(path) {
  return new Promise((resolve, reject) => {
    visualInsights.summary({
      images_file: fs.createReadStream(path)
    }, (error, response, request) => {
      if (error) {
        reject(error);
      } else {
        resolve(response)
      }
    })
  });
}