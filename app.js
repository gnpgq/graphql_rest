import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphQL/schema.js'
import { resolver } from './graphQL/resolver.js'
import restApi from './rest/controller.js'
import { startMeasuring, endMeasuring } from './performance/utils.js';

const app = express();
const router = express.Router()

router.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  })
)

router.use(
  '/rest',
  restApi.router
)

let start

const beforeMiddleware = function(req, res, next) {
  start = startMeasuring()
  next();
}

app.use(function(req, res, next){
  res.on('finish', function(){
    endMeasuring(start)
  });
  next();
});

app.use('/', beforeMiddleware, router)

const PORT = 3000;
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port d"+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);