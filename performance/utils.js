import fs from "fs";

let stream

const getStream = () => {
  if (!stream) {
    stream = fs.createWriteStream("./performance/results/cpu.csv", { flags: "a" });
  }
  return stream;
}

export const startMeasuring = () => {
  const startUsage = process.cpuUsage();
  return startUsage;
};

export const endMeasuring = (startUsage) => {
  const overallUsage = process.cpuUsage(startUsage);
  const stream = getStream()
  stream.write(overallUsage.user + "\n")
  console.log("cpu usage overall: ", overallUsage.user);
  return overallUsage.user
};
