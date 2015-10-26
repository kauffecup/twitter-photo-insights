import request from 'superagent';

/**
 * Get the visual insights information for a given
 * twitter handle
 */
export function getVisualInsights(screenName) {
  return new Promise((resolve, reject) => {
    request.get('/visualinsights')
      .query({screenname: screenName})
      .end((err,res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      })
  });
}