/**
 * Converts the watson response that looks like:
 * [
 *   {"name":"Activities/Concert/Weezer","score":0.102019},
 *   {"name":"Activities/Concert/Radiohead","score":1},
 *   {"name":"Activities/Dancing","score":0.143844},
 *   {"name":"Activities/Demonstration","score":0.0923308},
 *   {"name":"Activities/Graduation","score":0.128161},
 *   {"name":"Activities/Gymnastics","score":0.0816335},
 *   {"name":"Activities/Hunting","score":0.0817828},
 *   {"name":"Activities/Ice Hockey","score":0.0811199},
 *   {"name":"Activities/Meeting","score":0.204163},
 *   ...
 * ]
 *
 * To a much cooler nested thing that looks like:
 * {
 *   "name": "Insights",
 *   "children": [
 *     {
 *       "name": "Activities",
 *       "children": [
 *         {
 *           "name": "Concert",
 *           "children": [
 *             {"name": "Weezer", "score": 0.102019},
 *             {"name": "Radiohead", "score": 1}
 *           ]
 *         },
 *         { "name": "Dancing", "score": 0.143844},
 *         ...
 *       ]
 *     },
 *     ...
 *   ]
 * }
 */
export default function (summary) {
  return {
    name: "Insights",
    children: step2(step1(summary))
  }
}

/**
 * Given the initial response defined above, construct an interim
 * map That looks like:
 * {
 *   Places: {
 *     children: {
 *       Indoors: {
 *         children: {
 *           Room: 0.44194,
 *           Office: 0.172582,
 *           ...
 *         }
 *       },
 *       Outdoors: { ... }
 *     }
 *   }
 * }
 * Essentially it's almost our desired output except `children` is
 * a map instead of an array. This allows us to build this in O(n)
 * instead of O(n^2).
 */
function step1 (summary) {  
  var map = {};
  for (var {name, score} of summary) {
    var splitName = name.split('/');
    var currSpot = map;
    for (var i = 0; i < splitName.length; i++) {
      var currName = splitName[i];
      var isLast = i === (splitName.length - 1);
      if (isLast) {
        currSpot[currName] = score;
      } else {
        if (!currSpot[currName]) {
          currSpot[currName] = { children: {} };
        }
        // so this is weird. sometimes an upper level thing
        // has a score thats very close to but not exactly the
        // sum of the children. right now we're just ignoring it.
        if (typeof currSpot[currName] === 'number') {
          currSpot[currName] = { children: {} };
        }
        currSpot = currSpot[currName].children;
      }
    }
  }
  return map;
}

/**
 * Flatten the children maps from step1 in to children arrays
 * as described above. #recursion #woop
 */
function step2 (step1Map) {
  var children = [];
  for (var key in step1Map) {
    var value = step1Map[key];
    var myObj = {name: key};
    if (typeof value === 'number') {
      myObj.score = value
    } else {
      myObj.children = step2(value.children);
    }
    children.push(myObj)
  }
  return children;
}