import { runTest } from "../runTest.js"

// get just title of the question (and id)

const restEndpoint  = '/rest/questions'

const graphqlEndpoint = '/graphql'

const graphqlOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query {
        getQuestions {
          id
          title
        }
      }
    `,
  }),
}

async function fetchRest() {
  const response = await fetch(restEndpoint);
  const data = await response.json()
}

async function fetchGraphQL() {
  const response = await fetch(graphqlEndpoint, graphqlOptions)
  const data = await response.json()
}

export async function runTestCase2() {
  await runTest('testCase2Rest', fetchRest)
  await runTest('testCase2GraphQL', fetchGraphQL)
}