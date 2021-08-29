const {
  Post,
  Question,
  User,
  PostLike,
  sequelize,
} = require("../../../../models");
const paginationwithCondition = require("../../../shared/pagination");
const getFileFromAWS = require("../../../shared/AWS/getFile");
module.exports = listPostService = async ({ user, query }) => {
  try {
    let { userId, timeLine } = query;
    let innerInclude = [
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastname", "image", "username"],
        required: false,
      },

      {
        model: Question,
        as: "question",
        required: false,
        include: [
          {
            model: User,
            as: "asker",
            attributes: ["id", "firstName", "lastname", "image", "username"],
            required: false,
          },
          {
            model: User,
            as: "user",
            attributes: ["id", "firstName", "lastname", "image", "username"],
            required: false,
          },
        ],
      },
    ];

    if (user) {
      await innerInclude.push({
        model: PostLike,
        as: "postLikes",
        required: false,
        where: { userId: user.id },
      });
    }

    let dbQuery = {
      where: { userId },
      order: [["createdAt", "desc"]],
      include: innerInclude,
      attributes: {
        include: [
          [
            sequelize.literal(`
          (SELECT COUNT(*) FROM "postLike" WHERE "deletedAt" is null and "postId" = "Post".id)
          `),
            "likesCount",
          ],
        ],
      },
    };

    if (timeLine) JSON.parse(timeLine);

    if (!timeLine && !userId) {
      return { error: "User id is required", status: 400 };
    }

    if (timeLine) {
      delete dbQuery.where;
    }

    let { paginated } = await paginationwithCondition(Post, { query }, dbQuery);

    paginated.result = await Promise.all(
      paginated.result.map(async (p) => {
        p = p.toJSON();
        let liked = p.postLikes.find((like) => like.userId == user.id);

        if (liked) liked = true;
        else liked = false;

        p.liked = liked;
        delete p.postLikes;
        if (p.user) {
          if (p.user.image) p.user.image = await getFileFromAWS(p.user.image);
        }

        if (p.question) {
          let question = p.question[0];
          if (question) {
            if (question.annonymous == true) {
              delete question.asker;
              delete question.askerUserId;
            } else {
              if (question.asker)
                if (question.asker.image)
                  question.asker.image = await getFileFromAWS(
                    question.asker.image
                  );
            }
          }
          p.question = question || {};
        }
        return p;
      })
    );

    return {
      data: paginated,
      message: "Success",
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Internal Server Error",
      status: 500,
    };
  }
};
