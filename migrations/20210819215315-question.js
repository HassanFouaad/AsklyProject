module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("question", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      askerUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      text: {
        type: Sequelize.STRING(5000),
        allowNull: true,
      },
      answer: {
        type: Sequelize.STRING(50000),
        allowNull: true,
      },
      annonymous: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString(),
      },
    }),
  down: (queryInterface) => queryInterface.dropTable("question"),
};
