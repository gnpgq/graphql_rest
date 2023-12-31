import { runTest } from "../runTest.js"
import { getMeasurements } from "../utils.js"

// get 1000 questions, the same fields for rest and graphql

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
          owner_id
          view_count
          score
          title
          is_answered
          answer_count
          last_activity_date
          creation_date
          last_edit_date
          content_license
          link
          body
        }
      }
    `,
  }),
}

async function fetchGraphQL() {
  const response = await fetch(graphqlEndpoint, graphqlOptions)
  // const data = await response.json()
  return getMeasurements(response)
}

async function fetchRest() {
  const response = await fetch(restEndpoint);
 // const data = await response.json()
  return getMeasurements(response)
}


export async function runTestCase1() {
  await runTest('testCase1Rest', fetchRest)
  await runTest('testCase1GraphQL', fetchGraphQL)
}