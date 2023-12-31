import fs from "fs";

function convertToCSV(results) {
  const text = results
    .map(
      (result) =>
        `${result.relativeIterationStartTime};${result.elapsedTime};${result.cpuMeasurement};${result.size}`
    )
    .join("\n");
  return text;
}

export function saveResults({ testName, results }) {
  const csv = convertToCSV(results);
  fs.writeFile(`./performance/results/${testName}.csv`, csv, (err) => {
    if (err) {
      console.error(err);
    }
  });
}
