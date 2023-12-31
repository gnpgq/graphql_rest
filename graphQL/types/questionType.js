import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLBoolean } from "graphql";
import { UserType } from "./userType.js";
import { AnswerType } from "./answerType.js";
import { repository } from "../../db/repository.js";

export const QuestionType = new GraphQLObjectType({
  name: 'QuestionType',
  fields: () => ({
    id: {type: GraphQLID},
    owner_id: {type: GraphQLID},
    owner: {
      type: UserType,
      async resolve({owner_id}) {
        return repository.getUserById(owner_id)
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      async resolve({id}) {
        return repository.getAnswersByQuestionId(id)
      }
    },
    view_count: {type: GraphQLInt},
    score: {type: GraphQLInt},
    title: {type: GraphQLString},
    is_answered: {type: GraphQLBoolean},
    answer_count: {type: GraphQLInt},
    last_activity_date: {type: GraphQLString},
    creation_date: {type: GraphQLString},
    last_edit_date: {type: GraphQLString},
    content_license: {type: GraphQLString},
    link: {type: GraphQLString},
    body: {type: GraphQLString}
  })
})