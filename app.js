const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({

  schema: buildSchema(`
    type RootQuery {
      users: [String!]!
    }

    type RootMutation {
      createUser(name: String): String
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),

  rootValue: {
    events: () => {
      return ['Watters', 'JMac', 'Teddy', 'Lucas', 'Kyle']
    },
    createEvent: (args) => {
      const eventName = args.name;
      return eventName;
    }
  },
  
  graphiql: true
}));

app.listen(3000);
