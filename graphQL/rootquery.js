import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { QuestionType } from "./types/questionType.js";
import { repository } from "../db/repository.js";
import { UserType } from "./types/userType.js";

export const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    getQuestionById: {
      type: QuestionType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(source, {id}) {
        return repository.getQuestionById(id)
      }
    },
    getUserById: {
      type: UserType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      async resolve(source, {id}) {
        return repository.getUserById(id)
      }
    },
    getQuestions: {
      type: new GraphQLList(QuestionType),
      async resolve() {
        return repository.getAllQuestions()
      }
    }
  })
})