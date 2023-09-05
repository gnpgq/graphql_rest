import { buildSchema } from 'graphql'

export const schema = buildSchema(`
  type User {
    id: String!
    name: String
    link: String
  }
  type Query {
    users: [User]!
  }
`)
