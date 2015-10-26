import Promise       from 'bluebird';
import fs            from 'fs';
import archiver      from 'archiver';

const PIC_DIRECTORY = __dirname + '/twit_zips';
/** regex converts 'http://a/b/c/blah-blah.jpg' to 'blah-blah.jpg' */
const COOL_REGEX = /.*\/(.*)/;

var request = Promise.promisifyAll(require('request'));

if (!fs.existsSync(PIC_DIRECTORY)) {
  fs.mkdirSync(PIC_DIRECTORY);
}

/** Given an array of image links and a screen name, make all the requests for the images,
  * and put them in a zip under PIC_DIRECTORY. Returns a promise. */
export default function zipLinks(links, screenName) {
  return new Promise((resolve, reject) => {
    // create our archive and output stream
    var zipPath = PIC_DIRECTORY + '/' + screenName  + '.zip';
    var archive = archiver.create('zip', {});
    var output = fs.createWriteStream(PIC_DIRECTORY + '/' + screenName  + '.zip');
    // set up event handling
    output.on('finish', () => resolve(zipPath));
    output.on('error', reject);
    archive.on('error', reject);
    // pipe the archiver into the write stream
    archive.pipe(output);
    // for every link, append the request with the proper name
    links.map(l => {
      var postRegEx = COOL_REGEX.exec(l);
      if (postRegEx && postRegEx[0] && postRegEx[1]) {
        archive.append(request(l), {name: postRegEx[1]});
      }
    });
    // finalize our archive...
    archive.finalize();
  });
}
