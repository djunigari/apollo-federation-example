require('dotenv').config()

const jwt = require("jsonwebtoken");
const { accounts } = require("../config/data");
module.exports = {
    Account: {
        _resolveReference(object, args, { dataSources } ) {
          return dataSources.accountAPI.findById(object.id);     
        }   
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
          const { id, permissions, roles } = dataSources.accountAPI.login(email, password)
          return jwt.sign(
            { "https://awesomeapi.com/graphql": { roles, permissions } },
            process.env.APP_AUTH_SECRET,
            { algorithm: "HS256", subject: id, expiresIn: "1d" }
          );
        }
    }
}