import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { QuestionType } from "./questionType.js";
import { AnswerType } from "./answerType.js";
import { repository } from "../../db/repository.js";

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: {type: GraphQLID},
    display_name: {type: GraphQLString},
    is_employee: {type: GraphQLBoolean},
    accept_rate: {type: GraphQLInt},
    location: {type: GraphQLString},
    questions: {
      type: new GraphQLList(QuestionType),
      async resolve({id}) {
        return repository.getQuestionsByUserId(id)
      }
    },
    answers: {
      type: new GraphQLList(AnswerType),
      async resolve({id}) {
        return repository.getAnswersByUserId(id)
      }
    }
  })
})