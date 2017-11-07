const request = require('request');
const secrets = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

// getRepoContributors - fetch list of contributors
//   cb - callback function to handle results - cb(err, result)
//   repoOwner, repoName - github repository identification
function getRepoContributors(repoOwner, repoName, cb) {
  // curl -u <username>:<token> https://api.github.com/repos/jquery/jquery/contributors
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'hepuliu',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN
    }
  };


  request(options, function(err, res, body) {
    // parse body json string into object - body is json string
    let contributors = JSON.parse(body);
    cb(err, contributors);
  });  
}


function downloadImageByURL(url, filePath) {
  // ...
}


// calling getRepoContributors with hard-coded values
// callback function passes error first and response
/*
getRepoContributors("jquery", "jquery", function(err, result) {
  for (let contributor of result){
    console.log ("avatar_url: " + contributor['avatar_url']);
  }
  console.log("Errors:", err);
});
*/

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

