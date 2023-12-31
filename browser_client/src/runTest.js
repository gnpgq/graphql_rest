const testingTimeInSec = 5

async function sendResults(testName, results) {
  const body = {
    testName: testName,
    results: results
  }
  const response = await fetch('/results', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

export async function runTest(testName, fetchDataFunction) {
  const startTime = Date.now()

  let iterations = 0;
  let results = []

  while(Date.now() - startTime < testingTimeInSec * 1000) {
    ++iterations
    const relativeIterationStartTime = Date.now() - startTime
    const iterationStartTime = performance.now();

    const {cpuMeasurement, size} = await fetchDataFunction()

    const iterationEndTime = performance.now();
    const elapsedTime = iterationEndTime - iterationStartTime;
    results.push({relativeIterationStartTime, elapsedTime, cpuMeasurement, size})
  }
  sendResults(testName, results)
}