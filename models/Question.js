module.exports = function (sequelize, DataTypes) {
  const Question = sequelize.define(
    "Question",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      askerUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      text: {
        type: DataTypes.STRING(5000),
        allowNull: true,
      },
      answer: {
        type: DataTypes.STRING(50000),
        allowNull: true,
      },
      annonymous: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      tableName: "question",
      defaultScope: {
        where: {
          deletedAt: null,
        },
      },
    }
  );
  Question.associate = (models) => {
    Question.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Question.belongsTo(models.User, {
      foreignKey: "askerUserId",
      as: "asker",
    });
    Question.belongsToMany(models.Post, {
      foreignKey: "questionId",
      through: models.PostQuestion,
      otherKey: "postId",
      as: "post",
    });
  };

  return Question;
};
