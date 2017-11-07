const request = require('request');
const fs = require('fs');
const secrets = require('./secrets');

let owner = process.argv[2];
let repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

// getRepoContributors - fetch list of contributors
function getRepoContributors(repoOwner, repoName, cb) {
  // curl -u <username>:<token> https://api.github.com/repos/jquery/jquery/contributors
  let options = {
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

// makeDirectory - make directory if it does not exist
function makeDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

// downloadImageByURL - download image from url and save to filePath
function downloadImageByURL(url, filePath) {
  request
    .get(url)
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(fs.createWriteStream(filePath));
}


// calling getRepoContributors with hard-coded values
getRepoContributors(owner, repo, function(err, result) {
  
  // directory to save images to
  let dir = "avatars";

  // make image directory
  makeDirectory(dir);

  // loop through contributors
  for (let contributor of result){
    
    // construct file path using login
    let filePath = dir + "/" + contributor.login + ".jpg";

    // pass avatar_url and filepath to downloadImageByURL
    downloadImageByURL(contributor['avatar_url'], filePath);

    console.log("filePath: " + filePath + ", avatar_url: " + contributor['avatar_url']);

  }

  console.log("Errors:", err);

});
