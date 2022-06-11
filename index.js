const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileName = "HelloWorld.jpg";
const folderName = "010352"; //Ticket ID in Freshservice
const subFolder = "123456"; //Conversation ID in Freshservice
// const fileURL =
//   "http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";
const fileURL =
  "http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

var params = {
  Bucket: "iconnect-aditya" /* required */,
  Prefix: folderName, // Can be your folder name
};
s3.listObjectsV2(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    if (data.KeyCount === 1) uploadFile();
    else {
      console.log("Folder is not present");
      downloadImage();
      console.log("Image is Downloaded");
      setTimeout(() => {
        uploadFile();
        console.log("Folder is Created on Name", folderName);
      }, 5000);
    }
  }
});

const downloadImage = () => {
  var http = require("http"),
    Stream = require("stream").Transform,
    fs = require("fs");

  var url = fileURL;

  http
    .request(url, function (response) {
      var data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        fs.writeFileSync(`${fileName}`, data.read());
      });
    })
    .end();
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
};

// const uploadFile = () => {
//   fs.readFile(fileName, (err, data) => {
//     if (err) throw err;
//     const params = {
//       Bucket: "iconnect-aditya", // pass your bucket name
//       // Key: `${folderName}/${subFolder}/${orignalFilenName}`, // file will be saved as FolderName/filename.img
//       Key: "image.png2", // file will be saved as FolderName/filename.img
//       Body: JSON.stringify(data, null, 2),
//     };
//     s3.upload(params, function (s3Err, data) {
//       if (s3Err) throw s3Err;
//       console.log(`File uploaded successfully at ${data.Location}`);
//     });
//   });
// };
