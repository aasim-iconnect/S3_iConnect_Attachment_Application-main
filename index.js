const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileName = "document.png";
const folderName = "141"; //Ticket ID in Freshservice
const subFolder = "123456"; //Conversation ID in Freshservice
// const fileURL =
//   "http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
// const fileURL = "https://www.sample-videos.com/img/Sample-jpg-image-15mb.jpeg";
const fileURL =
  "https://iconnectsolutionspvtltd.ind-attachments.freshservice.com/data/helpdesk/attachments/production/27007817816/original/Asset2.png?response-content-type=image/png&Expires=1655100770&Signature=F-8unTEP5heFnalJqu9uFeYipEwb6BSTHQEDIwJGCGpru6YBL0a7o0vu-xLG0yBtQBsw~ydhHJdvMr4GdMVmw13yeSd6nmphjmDk5oZVI2BG80BMjhiUE8pD6iQ~466i2r-yWRs8UzOFxAc7Jk9-aqRSp0m1SCTKnk8B2QdfxDedcNsHCwy78DXSWK0NWnucCTAjC2JkNc6XJ2zq~So8i06lSzUym2uzQVimLQJ-xFlFxgABXNWQX0BsJfCAdzoE7u~cuO0LqYCJ943YwKOHWL8DN5hU5u5k-v4u-K54krsrqekeJKAW0QIijW7Tr62~RG1AbosN78LCYgM0GpHXhQ__&Key-Pair-Id=APKAIPHBXWY2KT5RCMPQ";

var params = {
  Bucket: "iconnect-aditya" /* required */,
  Prefix: folderName, // Can be your folder name
};
s3.listObjectsV2(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    if (data.KeyCount === 1) uploadFile();
    else {
      console.log("Folder is not present, Created New Folder");
      downloadImage();
      console.log("Image is Downloaded");
      setTimeout(() => {
        uploadFile();
        console.log("Folder is Created on S3 with Name", folderName);
      }, 5000);
    }
  }
});

const downloadImage = () => {
  const url = fileURL;

  const https = require("https");
  const fs = require("fs");

  https.get(url, (resp) => resp.pipe(fs.createWriteStream(fileName)));
};

const uploadFile = () => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${folderName}/${subFolder}/${fileName}`, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });

  const path = fileName;
  try {
    fs.unlinkSync(path);
    console.log("Downloaded File Deleted");
    //file removed
  } catch (err) {
    console.error(err);
  }
};
