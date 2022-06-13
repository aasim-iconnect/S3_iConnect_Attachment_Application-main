const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileName = "documents.png"; //File Name in Freshservice via API
const folderName = "035"; //Ticket ID in Freshservice via API
const subFolder = "678911"; //Conversation ID in Freshservice via API
// const fileURL =
//   "http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
const fileURL = "https://www.sample-videos.com/img/Sample-jpg-image-15mb.jpeg";
// const fileURL =
//   "https://iconnectsolutionspvtltd.ind-attachments.freshservice.com/data/helpdesk/attachments/production/27007817627/original/Asset0.png?response-content-type=image/png&Expires=1655197995&Signature=OecxIv5TohTsezvIOP63ycA5EiXAb8hVbfnOI1LzYdCF7F1KBnYf9SXlKJOdE2ib4wFYX66F7eKp66DanXjEYAFdRozlVwH32ZEF0RuIazdIINPXPNR5wHs4uQ4Z3~Isxjdve76deXd6DP3qoKkEZn-HC1ro72yMMxKnFAOROo5cbpcEWzVwTHIC3ddshgxGujE2akkqJmf6D~L-kQXp8NdjTV2JYLK3Z1VKPlJ0lfZ0l8ibQlX3crtZL-ZOFrE1Ps14KPdLo7Qjcke6kSlpC0ykr1O-iSxY06D5G0fdlfe87IFp9OK2JpP10oGrPV8PvDZQz2LSLA637h1NSwA4Jw__&Key-Pair-Id=APKAIPHBXWY2KT5RCMPQ";
// File URL via API

// var params = {
//   Bucket: "iconnect-aditya", //Bucket Name as per S3
//   Prefix: folderName, // Folder name to create in S3 Bucket
// };
// s3.listObjectsV2(params, function (err, data) {
//   if (err) console.log("Aditata", err, err.stack); // an error occurred
//   else {
//     if (data.KeyCount === 1) uploadFile();
//     else {
//       console.log("Folder is not present, Created New Folder");
//       downloadImage();
//       console.log("Image is Downloaded");
//       setTimeout(() => {
//         uploadFile();
//         console.log("Folder is Created on S3 with Name", folderName);
//       }, 2000);
//     }
//   }
// });

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
    console.log("Downloaded File Deleted");
  });

  const path = fileName;
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }
};

function name() {
  downloadImage();
  setTimeout(() => {
    uploadFile();
    console.log("Folder is Created on S3 with Name", folderName);
  }, 2000);
}
name();
