export const getMeasurements = async (responses) => {
  let cpuMeasurement = 0;
  let size = 0;
  let memoryMeasurement = 0
  const bodies = await Promise.all(responses.map(response => response.json()))
  responses.forEach((response) => {
    const cpu = response.headers.get("cpu");
    const memory = response.headers.get("memory");
    const s = response.headers.get("content-length");
    cpuMeasurement += Number(cpu)
    memoryMeasurement += Number(memory)
    size += Number(s)
  });

  return { cpuMeasurement, size, memoryMeasurement}
};
