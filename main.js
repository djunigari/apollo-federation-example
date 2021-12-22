require('dotenv').config()

const waitOn = require('wait-on')
const { startApolloServer } = require('./config/apollo')

const accounts = "tcp:"+process.env.APP_ACCOUNTS_PORT
const products = "tcp:"+process.env.APP_PRODUCTS_PORT
const reviews = "tcp:"+process.env.APP_REVIEWS_PORT

const options = {
  resources: [accounts,products,reviews]
}

waitOn(options)
  .then(() => {
    startApolloServer()
  })
  .catch((err) => {
    console.error('ERR:', err)
  })