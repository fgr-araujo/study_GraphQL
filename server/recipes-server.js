const express = require('express')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const schema = require('./schema/Schema')

const app = express()

app.use(bodyParser.json())
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening')
})
