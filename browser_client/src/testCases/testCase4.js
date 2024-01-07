import { runTest } from "../runTest.js";
import { getMeasurements } from "../utils.js";

// get authors of answers for 10 given questions

const restQuestionEndpoint = "/rest/questions";
const restUserEndpoint = "/rest/users";

const graphqlEndpoint = "/graphql";

const ids = [
  "3317050a-04c0-40f8-b952-af80821f24ba",
  "9184537f-5968-4ac0-a46f-e80f68088bb6",
  "5c353b4c-70e3-414b-867b-e62d3e6109a1",
  "2a2886c9-dcbe-4faf-a962-69ef6179010c",
  "09496e23-c3f2-4250-ab26-3e62c8415023",
  "5ea1f1fe-9fea-428e-a055-b2dfbe62c402",
  "11953928-15b0-4abf-a1b7-f513565495cb",
  "9cda1481-3239-4b70-b466-954eaadbe40c",
  "d597fc1a-b56e-41d1-9189-cbfb6b476efa",
  "1434e829-640e-416d-be0c-ca883317141e",
];

const graphqlOptions = (id) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
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
              is_employee
              accept_rate
              location
            }
          }
        }
      }
    `,
    variables: { id },
  }),
});

async function fetchRest() {
  let promises = [];

  for (let index = 0; index < ids.length; index++) {
    const id = ids[index];
    const test = fetch(`${restQuestionEndpoint}/${id}/answers`)
      .then((response) => response.json())
      .then((body) =>
        Promise.all(body.map((a) => fetch(`${restUserEndpoint}/${a.user_id}`)))
      );
    promises.push(test)
  }

  const responses = await Promise.all(promises)

  return getMeasurements(responses.flat(2));
}

async function fetchGraphQL() {
  const result = await Promise.all(
    ids.map((id) => fetch(graphqlEndpoint, graphqlOptions(id)))
  );
  return getMeasurements(result);
}

export async function runTestCase4() {
  await runTest("testCase4Rest", fetchRest);
  await runTest("testCase4GraphQL", fetchGraphQL);
}
