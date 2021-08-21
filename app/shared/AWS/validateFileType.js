const { imageSize, imageTypes } = require("./fileTypes.json");

const validateFileTypes = async (file, type) => {
  if (type == "image") {
    let mediaType;
    const [, fileExt] = file.mimetype.split("/");
    const allImageTypes = imageTypes.split(",");
    console.log(allImageTypes, fileExt);
    if (allImageTypes.includes(`${fileExt}`)) {
      mediaType = "image";
      return {
        file: {
          fileExt,
          buffer: file.buffer,
        },
      };
    } else {
      return {
        error: "File extension is not acceptable",
      };
    }
  }

  return {
    error: "Please Specify file type",
  };
};

module.exports = validateFileTypes;
