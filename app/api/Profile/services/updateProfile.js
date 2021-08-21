const { User } = require("../../../../models");
const userFinder = require("../../../shared/userFinder");
const validateFileType = require("../../../shared/AWS/validateFileType");
const uploadFileToAWS = require("../../../shared/AWS/uploadFile");

const updateProfileService = async ({ user, body, files }) => {
  let imageLink;
  let image;

  if (files.length != 0) {
    const { file, error } = await validateFileType(files[0], "image");
    if (error) return { error, status: 400 };

    let { link, key } = await uploadFileToAWS(file.buffer, file.fileExt);
    image = key;
    imageLink = link;
  }

  if (body.username) {
    let taken = await userFinder.findByUsername(body.username);
    if (taken && taken.id != user.id)
      return { error: "Username is already taken", status: 400 };
  }
  body.image = image;
  let data = await User.update(body, {
    where: { id: user.id },
  });
  body.image = imageLink;
  return {
    data: body,
    message: "You have updated your profile",
  };
};

module.exports = updateProfileService;
