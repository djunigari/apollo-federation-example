const AuthorizationRules = require('./AuthorizationRules')
const InputValidations = require('./InputValidations')
const { and, or, shield} = require("graphql-shield");
const { ApolloError } = require('apollo-server-errors');
  
const rules = new AuthorizationRules()
const validations = new InputValidations()

const permissions = shield(
  {
    Query: {
      account: or(and(rules.canReadOwnAccount, rules.isReadingOwnAccount), rules.canReadAnyAccount),
      accounts: rules.canReadAnyAccount,
      viewer: rules.isAuthenticated
    }, 
    Mutation:{
      login: validations.loginValidator
    },  
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        // expected errors
        return thrownThing
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        console.error(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        // what the hell got thrown
        console.error('The resolver threw something that is not an error.')
        console.error(thrownThing)
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      }
    },
  }
)

module.exports = { permissions };