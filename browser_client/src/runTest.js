const testingTimeInSec = 12

async function sendResults(testName, results) {

  (BigInt.prototype).toJSON = function () {
    return Number(this);
  };

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

export async function runTest(testName, fetchDataFunction, sendAdditionalMeasurements = true) {
  const startTime = Date.now()

  let iterations = 0;
  let results = []

  while(Date.now() - startTime < testingTimeInSec * 1000) {
    ++iterations
    const relativeIterationStartTime = Date.now() - startTime
    const iterationStartTime = performance.now();

    const result = await fetchDataFunction()

    const iterationEndTime = performance.now();
    const elapsedTime = iterationEndTime - iterationStartTime;

    if (sendAdditionalMeasurements) {
      const {cpuMeasurement, size, memoryMeasurement} = result
      results.push({relativeIterationStartTime, elapsedTime, cpuMeasurement, size, memoryMeasurement})
    } else {
      results.push({relativeIterationStartTime, elapsedTime})
    }
  }
  sendResults(testName, results)
}