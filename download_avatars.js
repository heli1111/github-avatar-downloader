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
    cb(err, body);
  });  
}

// calling getRepoContributors with hard-coded values
// callback function passes error first and response
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

