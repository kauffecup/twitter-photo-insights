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


// /**
//  * Classifies @param images_file using all available classifiers.
//  *
//  * @param  {ReadStream} images_file The zip of images to analyze.
//  */
// VisualInsights.prototype.summary = function(params, callback) {
//   params = params || {};

//   if (!params.images_file) {
//     callback(new Error('Missing required parameters: images_file'));
//     return;
//   }

//   if (!isStream(params.images_file)) {
//     callback(new Error('images_file is not a standard Node.js Stream'));
//     return;
//   }

//   var parameters = {
//     options: {
//       method: 'POST',
//       url: '/v1/summary',
//       formData: params,
//       json: true
//     },
//     defaultOptions: this._options
//   };
//   return requestFactory(parameters, callback);