const { inputRule } = require("graphql-shield");
const {authenticationSchema} = require('../../validators/AccountValidator')

class InputValidations{
    loginValidator = inputRule()( _ => authenticationSchema,
        {
          abortEarly: false,
        },
      )
}

module.exports = InputValidations

