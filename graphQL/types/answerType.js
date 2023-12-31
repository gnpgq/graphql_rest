import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { QuestionType } from "./questionType.js";
import { UserType } from "./userType.js";
import { repository } from "../../db/repository.js";

export const AnswerType = new GraphQLObjectType({
  name: 'AnswerType',
  fields: () => ({
    id: {type: GraphQLID},
    question_id: {type: GraphQLString},
    user_id: {type: GraphQLString},
    question: {
      type: QuestionType,
      async resolve({question_id}) {
        return repository.getQuestionById(question_id)
      }
    },
    body: {type: GraphQLString},
    user: {
      type: UserType,
      async resolve({user_id}) {
        return repository.getUserById(user_id)
      }
    },
    accepted: {type: GraphQLBoolean},
    score: {type: GraphQLInt},
  })
})