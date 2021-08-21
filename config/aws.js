require("dotenv").config();
let AWS = require("aws-sdk");
const config = require(".");

const s3 = new AWS.S3({
  endpoint: config.awsRegion,
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsAccessKey,
  Bucket: config.awsBucket,
  bucket: config.awsBucket,
  signatureVersion: "v4",
  logger: console,
  httpOptions: {
    connectTimeout: 2 * 5000, // time succeed in starting the call
    timeout: 2 * 5000, // time to wait for a response
  },
});

module.exports = {
  s3,
};
