import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core"
import { runTest } from "../runTest";
import { getMeasurements } from "../utils";

// test case 1 but with apollo client cache

const graphqlEndpoint = '/graphql'
const restEndpoint  = '/rest/questions?useCache=true'

const client = new ApolloClient({
	uri: graphqlEndpoint,
	cache: new InMemoryCache()
});

const runGraphQLTest = async () => {
	const data = await client.query({
		query: gql`
			query getQuestions {
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
		`
	})
	return data
}

async function fetchRest() {
  const response = await fetch(restEndpoint);
  const data = await response.json()
	return data
}

export async function runTestCase5() {
	await runTest('testCase5Rest', fetchRest, false)
	await runTest('testCase5GraphQL', runGraphQLTest, false)
}