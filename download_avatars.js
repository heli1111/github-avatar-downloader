const request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// getRepoContributors - fetch list of contributors
//   cb - callback function to handle results - cb(err, result)
//   repoOwner, repoName - github repository identification
function getRepoContributors(repoOwner, repoName, cb) {
  // curl -u <username>:<token> https://api.github.com/repos/jquery/jquery/contributors
}

// calling getRepoContributors with hard-coded values
// callback function passes error first and response
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

