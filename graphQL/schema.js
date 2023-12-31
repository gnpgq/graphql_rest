import { GraphQLSchema } from 'graphql'
import { RootQuery } from './rootquery.js'

export const schema = new GraphQLSchema({
  query: RootQuery
})
