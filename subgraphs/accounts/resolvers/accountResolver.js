require('dotenv').config()

const jwt = require("jsonwebtoken");

module.exports = {
    Account: {
        _resolveReference(account, args, { dataSources } ) {
          return dataSources.accountAPI.findById(account.id);     
        },
        userDetail(account, args, { dataSources } ) {
          return dataSources.userAPI.findById(account.userDetail.id)
        },
        roles(account, args, { dataSources } ) {
          const roles = []
          account.roles && account.roles.forEach(role => {
            roles.push(dataSources.roleAPI.findById(role.id))
          })
          return roles
        },
      },   
    Query: {
        account(parent, { id }, { dataSources } ) {
          return dataSources.accountAPI.findById(id)
        },
        accounts(parent, args, { dataSources } ) {
          return dataSources.accountAPI.all();
        },
        viewer(parent, args, { user, dataSources}) {
          return dataSources.accountAPI.findById(user.sub)
        }
    },
    Mutation: {
        login(parent, { email, password }, { dataSources } ) {
          const { id, roles } = dataSources.accountAPI.login(email, password)
          return jwt.sign(
            { "https://awesomeapi.com/graphql": { roles } },
            process.env.APP_AUTH_SECRET,
            { algorithm: "HS256", subject: id, expiresIn: "1d" }
          );
        }
    }
}