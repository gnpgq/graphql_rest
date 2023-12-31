import { ApolloClient, gql, InMemoryCache } from "@apollo/client/core"
import { runTest } from "../runTest";

// test case 1 but with apollo client cache

const graphqlEndpoint = '/graphql'
const restEndpoint  = '/rest/questions?useCache=true'

const client = new ApolloClient({
	uri: graphqlEndpoint,
	cache: new InMemoryCache()
});

const runGraphQLTest = async () => {
	const stupidData = await client.query({
		query: gql`
			query getQuestions {
				getQuestions {
          id
          owner_id
          view_count
          score
          title
        }
			}
		`
	})
	return stupidData
}

async function fetchRest() {
  const response = await fetch(restEndpoint);
  const data = await response.json()
}

export async function runTestCase5() {
	await runTest('testCase5Rest', fetchRest)
	await runTest('testCase5GraphQL', runGraphQLTest)
}