import autocannon from "autocannon"
import fs from "fs"

const runTest = async (options, resultFile) => {
  const result = await autocannon(options, (err, result) => {
    if (err) {
      //reject(err);
      console.log(err)
    } else {
      fs.writeFile(resultFile, JSON.stringify(result), err => {
        if (err) {
          console.error(err);
        }
      });
    }
  },)
  // fs.writeFile(resultFile, JSON.stringify(result), err => {
  //   if (err) {
  //     console.error(err);
  //   }
  // });
}

const rest_options = {
  url: 'localhost:3000/rest/users',
  workers: 1
}

const body = JSON.stringify({
  query:
    "{\n  users {\n    id\n     }\n}"
});

const graphql_options = {
  url: 'http://localhost:3000/graphql',
  workers: 1,
  method: "POST",
  body,
  headers: {
    "content-type": "application/json",
  },
}

await runTest(rest_options, 'rest.json')
await runTest(graphql_options, 'graphql.json')
