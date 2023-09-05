export const startMeasuring = () => {
  const startUsage = process.cpuUsage()
 // console.log("cpu usage before: ", startUsage);
  return startUsage
}

export const endMeasuring = (startUsage) => {
  const overallUsage = process.cpuUsage(startUsage)
  console.log("cpu usage overall: ", overallUsage.user);
}