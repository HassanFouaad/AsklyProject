module.exports = function (sequelize, DataTypes) {
  const Chat = sequelize.define(
    "Chat",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      lastMessage: {
        type: DataTypes.STRING(50000),
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "chat",
      defaultScope: {
        where: {
          deletedAt: null,
        },
      },
    }
  );

  Chat.associate = (models) => {
    Chat.belongsTo(models.User, {
      foreignKey: "creatorId",
      as: "creator",
    });

    Chat.belongsTo(models.User, {
      foreignKey: "receiverId",
      as: "receiver",
    });
  };

  return Chat;
};
