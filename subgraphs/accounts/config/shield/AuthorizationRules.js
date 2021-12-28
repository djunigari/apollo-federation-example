const { rule } = require("graphql-shield");

class ShieldRules {
    getPermissions(user) {
        if (user && user["https://awesomeapi.com/graphql"]) {
          return user["https://awesomeapi.com/graphql"].permissions;
        }
        return [];
    }

    isAuthenticated = rule()((parent, args, { user }) => {
        return user !== null;
      });
      
    canReadAnyAccount = rule()((parent, args, { user }) => {
        const userPermissions = this.getPermissions(user);
        return userPermissions.includes("read:any_account");
    });
        
    canReadOwnAccount = rule()((parent, args, { user }) => {
        const userPermissions = this.getPermissions(user);
        return userPermissions.includes("read:own_account");
    });
        
    isReadingOwnAccount = rule()((parent, { id }, { user }) => {
        return user && user.sub === id;
    });
}

module.exports = ShieldRules 