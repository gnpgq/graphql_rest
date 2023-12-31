import express from "express";
import nocache from "nocache";

import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphQL/schema.js";
import { resolver } from "./graphQL/resolver.js";
import restApi from "./rest/controller.js";
import { startMeasuring, endMeasuring } from "./performance/utils.js";
import { saveResults } from "./performance/saveResults.js";

const addCacheHeader = (req, res, next) => {
  const useCache = req.query.useCache;
  if (useCache) {
    res.setHeader("Cache-Control", "max-age=3600");
  }
  next()
}

const app = express();
const router = express.Router();

app.use(express.json({ limit: "50mb" }));

app.use(nocache());

app.use(addCacheHeader)

router.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
);

router.use("/rest", restApi.router);

router.post("/results", (req, res) => {
  saveResults(req.body);
  res.sendStatus(200);
});

let start;

const beforeMiddleware = function (req, res, next) {
  start = startMeasuring();
  const previousSend = res.send
  res.send = (data) => {
    const value = endMeasuring(start)
    res.send = previousSend
    res.set('cpuMeasurement', JSON.stringify(value))
    return res.send(data)
  }
  next();
};

// app.use(function (req, res, next) {
//   res.on("finish", function () {
//     endMeasuring(start);
//   });
//   next();
// });

app.use("/", beforeMiddleware, router);

const PORT = 3004;
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
