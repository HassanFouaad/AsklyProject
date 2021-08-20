const { Post, Question, User } = require("../../../../models");
const paginationwithCondition = require("../../../shared/pagination");

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
    paginated.result.map((p) => {
      p = p.toJSON();
      if (p.question) {
        let question = p.question[0];
        if (question) {
          if (question.annonymous == true) {
            delete question.asker;
            delete question.askerUserId;
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
