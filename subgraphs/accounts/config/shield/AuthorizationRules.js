const { rule } = require("graphql-shield");

class ShieldRules {
    getRoles(user) {
        if (user && user["https://awesomeapi.com/graphql"]) {
          return user["https://awesomeapi.com/graphql"].roles;
        }
        return [];
    }

    isAuthenticated = rule()((parent, args, { user }) => {
        return user !== null;
      });
      
    canReadAnyAccount = rule()((parent, args, { user }) => {
        const roles = this.getRoles(user).map(r => r.name);
        return roles.includes('admin')
    });
        
    canReadOwnAccount = rule()((parent, args, { user }) => {
        const roles = this.getRoles(user).map(r => r.name);
        return roles.includes('subscriber')
    });
        
    isReadingOwnAccount = rule()((parent, { id }, { user }) => {
        return user && user.sub === id;
    });
}

module.exports = ShieldRules 