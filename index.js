const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const response = require("./response.json");
const aditya = require("./aditya.json");
const express = require("express");
const app = express();

app.use(express.json());
dotenv.config();

// respond with "hello world" when a GET request is made to the homepage
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server is Running on Port: nodejs.adityatawade.com");
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const downloadImage = (url, fileName, uploadFile) => {
  //   const url = fileURL;

  const https = require("https");
  const fs = require("fs");

  https
    .get(url, (resp) => resp.pipe(fs.createWriteStream(fileName)))
    .on("close", () => {
      console.log("Downloaded File");
      uploadFile();
    });
};

const uploadFile = (ticket_id, conversation_id, filename) => {
  // Read content from the file
  console.log("Uploading file");
  const fileContent = fs.readFileSync(filename);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${ticket_id}/${conversation_id}/${filename}`, // File name you want to save as in S3
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

  //   const path = fileName;
  try {
    fs.unlinkSync(filename);
    //file removed
  } catch (err) {
    console.error(err);
  }
};

function name(ticket_id, conversation_id, url, fileName) {
  downloadImage(url, fileName, () =>
    uploadFile(ticket_id, conversation_id, fileName)
  );
  // setTimeout(() => {
  //   uploadFile(ticket_id, conversation_id, fileName);
  //   console.log("Folder is Created on S3 with Name");
  // }, 20000);
}

// if (false) {
//   const conversations = response.conversations;

//   conversations.map((conversation) => {
//     const attachmnets = conversation.attachments;
//     const ticket_id = conversation.ticket_id;
//     const conversation_id = conversation.id;
//     attachmnets.forEach((attachmnet) => {
//       name(
//         ticket_id,
//         conversation_id,
//         attachmnet.attachment_url,
//         attachmnet.name
//       );
//     });
//   });
// } else {
//   // const runFile = 0;
//   aditya.conversation.map((conversation, index) => {
//     // if (index !== runFile) return;
//     const attachmnets = conversation.attachments;
//     const ticket_id = conversation.ticket_id;
//     const conversation_id = conversation.id;
//     attachmnets.forEach((attachmnet) => {
//       name(
//         ticket_id,
//         conversation_id,
//         attachmnet.attachment_url,
//         attachmnet.name
//       );
//     });
//   });
// }

app.post("/s3_upload", (req, res) => {
  // console.log("A", typeof req.body);
  // console.log("BODY 1", req.body.conversation);
  // console.log("BODY 2", req.body.conversation.conversations);
  req.body.conversation.conversations.map((conversation) => {
    const attachments = conversation.attachments;
    const ticket_id = conversation.ticket_id;
    const conversation_id = conversation.id;
    attachments.forEach((attachmnet) => {
      name(
        ticket_id,
        conversation_id,
        attachmnet.attachment_url,
        attachmnet.name
      );
    });
  });
  res.send("File successfully uploaded to s3");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
