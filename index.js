const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const response = require("./response.json");
const aditya = require("./aditya.json");
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const downloadImage = (url, fileName) => {
  //   const url = fileURL;

  const https = require("https");
  const fs = require("fs");

  https.get(url, (resp) => resp.pipe(fs.createWriteStream(fileName)));
};

const uploadFile = (ticket_id, conversation_id, filename) => {
  // Read content from the file
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
  downloadImage(url, fileName);
  setTimeout(() => {
    uploadFile(ticket_id, conversation_id, fileName);
    console.log("Folder is Created on S3 with Name");
  }, 20000);
}

if (false) {
  const conversations = response.conversations;

  conversations.map((conversation) => {
    const attachmnets = conversation.attachments;
    const ticket_id = conversation.ticket_id;
    const conversation_id = conversation.id;
    attachmnets.forEach((attachmnet) => {
      name(
        ticket_id,
        conversation_id,
        attachmnet.attachment_url,
        attachmnet.name
      );
    });
  });
} else {
  // const runFile = 0;
  aditya.conversation.map((conversation, index) => {
    // if (index !== runFile) return;
    const attachmnets = conversation.attachments;
    const ticket_id = conversation.ticket_id;
    const conversation_id = conversation.id;
    attachmnets.forEach((attachmnet) => {
      name(
        ticket_id,
        conversation_id,
        attachmnet.attachment_url,
        attachmnet.name
      );
    });
  });
}
