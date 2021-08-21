const { Post, Question, User } = require("../../../../models");
const paginationwithCondition = require("../../../shared/pagination");
const getFileFromAWS = require("../../../shared/AWS/getFile");
module.exports = listPostService = async ({ user, query }) => {
  let { userId, timeLine } = query;
  let dbQuery = {
    where: { userId },
    order: [["createdAt", "desc"]],

    include: [
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
    ],
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
      p.user.image = await getFileFromAWS(p.user.image);
      if (p.question) {
        let question = p.question[0];
        if (question) {
          if (question.annonymous == true) {
            delete question.asker;
            delete question.askerUserId;
          } else {
            question.asker.image = await getFileFromAWS(question.asker.image);
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
};
