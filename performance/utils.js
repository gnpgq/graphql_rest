import * as v8 from 'node:v8';

const maxHeap = v8.getHeapStatistics().heap_size_limit;

function getPercentOfMaxHeapInUse() {
  return v8.getHeapStatistics().used_heap_size / maxHeap;
}

export const startMeasuring = () => {
  const startUsage = process.cpuUsage();
  return startUsage;
};

export const endMeasuring = (startUsage) => {
  const overallCpuUsage = process.cpuUsage(startUsage);
  const userCpuUsage = overallCpuUsage.user
  const heapInUse = getPercentOfMaxHeapInUse()

  console.log("cpu usage overall: ", userCpuUsage);
  return {cpu: userCpuUsage, memory: heapInUse}
};
