const { gql } = require("apollo-server-core");

const typeDefs = gql`
  type Query {
    transactions: [Transaction!]!
  }

  type Transaction {
    id: ID!
    date: String!
    status: String!
    type: String!
  }
`;

module.exports = typeDefs;
