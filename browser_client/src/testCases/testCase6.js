import { runTest } from "../runTest.js"
import { getMeasurements } from "../utils.js"

// get 1000 questions, the same fields for rest and graphql

const restEndpoint  = '/rest/questions'

const graphqlEndpoint = '/graphql'

const graphqlOptions = (id) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query GetQuestion($id: ID!){
        getQuestionById(id: $id) {
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
          answers {
            id
            body
            user_id
            question_id
            score
            accepted
          }
        }
      }
    `,
    variables: {id}
  }),
})


async function fetchGraphQL() {
  const responses = await Promise.all([...Array(50).keys()].map(_ => fetch(graphqlEndpoint, graphqlOptions("11953928-15b0-4abf-a1b7-f513565495cb"))))
  return getMeasurements(responses)
}

async function fetchRest() {
  const responses = await Promise.all([...Array(50).keys()].map(_ => fetch(`${restEndpoint}/11953928-15b0-4abf-a1b7-f513565495cb`)))
  return getMeasurements(responses)
}


export async function runTestCase6() {
  await runTest('testCase6Rest', fetchRest)
  await runTest('testCase6GraphQL', fetchGraphQL)
}