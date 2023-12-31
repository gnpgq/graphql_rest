import { runTest } from "../runTest.js"

// get authors of answers for 10 given questions

const restQuestionEndpoint  = '/rest/questions'
const restUserEndpoint = '/rest/users'

const graphqlEndpoint = '/graphql'

const ids = [
  "77288122-5098-4d6a-942f-19b62061e983",
  "fa38ec73-b834-4b25-9462-97c4b2487006",
  "ab9c1231-24e3-4036-8394-e46400c8a562",
  "b78d08cf-a988-4621-846b-e3cb261e3d20",
  "b1c491df-8a10-4f3b-beb5-598aed45cf34",
  "b2d064bf-21ac-4bb5-baa1-44aff05804d5",
  "5c1b592d-b764-4d4a-b7f2-249f3dc86a7c",
  "f1f96d45-c090-4031-917e-25b156c08075",
  "d25c5564-7274-4a6e-872b-3216f4ef7948",
  "4580066c-61b6-4c56-9eed-bae2c5ca042d"
]

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
          answers {
            id
            user {
              id
              display_name
            }
          }
        }
      }
    `,
    variables: {id}
  }),
})

async function fetchRest() {
  const users = await Promise.all(ids.map(async id => {
    const response = await fetch(`${restQuestionEndpoint}/${id}/answers`);
    const answers = await response.json()
    return Promise.all(answers.map(a => fetch(`${restUserEndpoint}/${a.user_id}`)))
  }))
}

async function fetchGraphQL() {
  const result = await Promise.all(ids.map(id => fetch(graphqlEndpoint, graphqlOptions(id))))
  return result
}

export async function runTestCase4() {
  await runTest('testCase4Rest', fetchRest)
  await runTest('testCase4GraphQL', fetchGraphQL)
}