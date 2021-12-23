const { and, or, rule, shield } = require("graphql-shield");

function getPermissions(user) {
    if (user && user["https://awesomeapi.com/graphql"]) {
      return user["https://awesomeapi.com/graphql"].permissions;
    }
    return [];
  }
  

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null;
});

const canReadAnyAccount = rule()((parent, args, { user }) => {
    const userPermissions = getPermissions(user);
    return userPermissions.includes("read:any_account");
  });
  
const canReadOwnAccount = rule()((parent, args, { user }) => {
    const userPermissions = getPermissions(user);
    return userPermissions.includes("read:own_account");
});
  
const isReadingOwnAccount = rule()((parent, { id }, { user }) => {
    return user && user.sub === id;
});
  
const permissions = shield({
    Query: {
    },
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
        console.error('The resolver threw something that is not an error.')
        console.error(thrownThing)
        return new Error('Internal server error', 'ERR_INTERNAL_SERVER')
    },
});

module.exports = { permissions };