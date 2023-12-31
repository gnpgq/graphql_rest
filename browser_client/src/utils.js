export const getMeasurements = async (response) => {
  const cpuMeasurement = response.headers.get('cpumeasurement')
  const size = response.headers.get('content-length')
  return {cpuMeasurement, size}
}