export const getMeasurements = async (responses) => {
  let cpuMeasurement = 0;
  let size = 0;
  let memoryMeasurement = 0
  responses.forEach((response) => {
    const cpu = response.headers.get("cpu");
    const memory = response.headers.get("memory");
    const s = response.headers.get("content-length");
    cpuMeasurement += Number(cpu)
    memoryMeasurement += Number(memory)
    size += Number(s)
  });

  return { cpuMeasurement, size, memoryMeasurement}


  // const data = responses.reduce(
  //   (result, response) => {
  //     // const body = await response.json()
  //     const cpuMeasurement = response.headers.get("cpu");
  //     const memoryMeasurement = response.headers.get("memory");
  //     const size = response.headers.get("content-length");
  //     return {
  //       cpuMeasurement: result.cpuMeasurement + Number(cpuMeasurement),
  //       size: result.size + Number(size),
  //       memoryMeasurement: 0,
  //     };
  //   },
  //   { cpuMeasurement: 0, size: 0, memoryMeasurement: 0 }
  // );

  // return data;
  // const body = await response.json()
  // const cpuMeasurement = response.headers.get('cpu')
  // const memoryMeasurement = response.headers.get('memory')
  // const size = response.headers.get('content-length')
  // return {cpuMeasurement, size, memoryMeasurement}
};
