import { runTest } from "../runTest.js"
import { getMeasurements } from "../utils.js"

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
  return getMeasurements([response])
}

async function fetchGraphQL() {
  const response = await fetch(graphqlEndpoint, graphqlOptions)
  return getMeasurements([response])
}

export async function runTestCase2() {
  await runTest('testCase2Rest', fetchRest)
  await runTest('testCase2GraphQL', fetchGraphQL)
}