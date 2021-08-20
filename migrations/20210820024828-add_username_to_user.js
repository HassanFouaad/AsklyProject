module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("user", "username", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("user", "coverPhoto", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("user", "media"),
      queryInterface.removeColumn("user", "coverPhoto"),
    ]);
  },
};
