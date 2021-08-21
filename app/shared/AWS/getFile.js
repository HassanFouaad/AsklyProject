const { s3 } = require("../../../config/aws");
const config = require("../../../config");
async function getSignedUrl(photoName) {
  try {
    let params = {
      Bucket: config.awsBucket,
      Key: photoName,
    };
    let url = s3.getSignedUrl("getObject", params);
    return url;
  } catch (error) {
    console.error(error.message)
    return "";
  }
}

module.exports = getSignedUrl;
