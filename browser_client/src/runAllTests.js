import { runTestCase1 } from "./testCases/testCase1.js";
import { runTestCase2 } from "./testCases/testCase2.js";
import { runTestCase3 } from "./testCases/testCase3.js";
import { runTestCase4 } from "./testCases/testCase4.js";
import { runTestCase5 } from "./testCases/testCase5.js";

export async function runAllTests() {
  await runTestCase1();
  await runTestCase2();
  await runTestCase3();
  await runTestCase4();
  await runTestCase5();
}
