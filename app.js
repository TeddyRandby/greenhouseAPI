const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is-auth");
const mongoURI = process.env.MONGODB_URI || "mongodb://APIconnection:MAKEconnection69@ds129670.mlab.com:29670/heroku_876z060c"


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(
    mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });

// const express = require('express');
// const bodyParser = require('body-parser');
// const graphqlHTTP = require('express-graphql');
// const { buildSchema } = require('graphql');

// const app = express();

// app.use(bodyParser.json());

// app.use('/graphql', graphqlHTTP({

//   schema: buildSchema(`
//     type RootQuery {
//       users: [String!]!
//     }

//     type RootMutation {
//       createUser(name: String): String
//     }

//     schema {
//       query: RootQuery
//       mutation: RootMutation
//     }
//   `),

//   rootValue: {
//     events: () => {
//       return ['Watters', 'JMac', 'Teddy', 'Lucas', 'Kyle']
//     },
//     createEvent: (args) => {
//       const eventName = args.name;
//       return eventName;
//     }
//   },

//   graphiql: true
// }));

// app.listen(3000);
