const AWS = require("aws-sdk");
var shortUrl = require("node-url-shortener");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");

const fileUrl =
  "http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

shortUrl.short(fileUrl, function (err, url) {
  console.log(url);
});

const file = fs.createWriteStream("001.jpg");
const request = http.get(fileUrl, function (response) {
  response.pipe(file);

  // after download completed close filestream
  file.on("finish", () => {
    file.close();
    console.log("Download Completed");
  });
});
