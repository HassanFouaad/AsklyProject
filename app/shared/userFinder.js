const { User } = require("../../models");
class UserFinder {
  async findById(id) {
    let user = await User.findByPk(id);
    if (!user) return null;
    user = user.toJSON();
    return user;
  }

  async findByMobile(mobile) {
    let user = await User.findOne({
      where: { mobile },
    });
    if (!user) return null;
    user = user.toJSON();
    return user;
  }

  async findByEmail(email) {
    let user = await User.findOne({
      where: { email },
    });
    if (!user) return null;
    user = user.toJSON();
    return user;
  }

  async findByUsername(username) {
    let user = await User.findOne({
      where: { username },
    });
    if (!user) return null;
    user = user.toJSON();
    return user;
  }
}

module.exports = new UserFinder();
