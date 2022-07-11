const mock = require("./mock.json");

const resolvers = {
  Query: {
    transactions: () => mock,
  },
};

module.exports = resolvers;
