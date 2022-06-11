const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const generatePreSignedPutUrl = async (fileName, fileType) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
  };

  let url;
  try {
    url = await s3.getSignedUrlPromise("putObject", params);
  } catch (err) {
    // do something with the error here
    // and abort the operation.
    return;
  }

  return url;
};
