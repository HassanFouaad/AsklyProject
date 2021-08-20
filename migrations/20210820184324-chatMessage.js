module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("chatMessage", {
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
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "chat",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      message: {
        type: Sequelize.STRING(5000),
        allowNull: false,
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
  down: (queryInterface) => queryInterface.dropTable("chatMessage"),
};
