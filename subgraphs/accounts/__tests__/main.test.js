const AccountAPI = require("../dataSources/AccountAPI");
const { ApolloServer } = require('apollo-server');

const typeDefs = require('../schema/typeDefs')
const resolvers = require('../resolvers')
jest.mock('../dataSources/AccountAPI')

it('fetches single launch', async () => {

  const accountAPI = new AccountAPI();

  // create a test server to test against, using our production typeDefs,
  // resolvers, and dataSources.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ accountAPI }),
    context: () => ({ user: { id: 1, email: 'a@a.a' } }),
  });

const account = {
    id: "12345",
    name: "Alice",
    email: "alice@email.com",
    password: "pAsSWoRd!",
    roles: ["admin"],
    permissions: ["read:any_account", "read:own_account"]
}

  // mock the dataSource's underlying fetch methods
  accountAPI.findById = jest.fn();
  accountAPI.findById.mockReturnValue(account)
  
  const GET_ACCOUNT = `account(id:12345) {
    id name 
  }`

  // run query against the server and snapshot the output
  const res = await server.executeOperation({ query: GET_ACCOUNT, variables: { id: 12345 } });
  expect(res).toMatchSnapshot();
});
