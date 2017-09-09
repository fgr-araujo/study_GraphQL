const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql
const AuthorModel = require('../model/AuthorModel')
const RecipeModel = require('../model/RecipeModel')
const RateModel = require('../model/RateModel')
const AuthorType = require('./AuthorType')
const RecipeType = require('./RecipeType')
const RateType = require('./RateType')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString }},
      resolve (parentValue, args) {
        return AuthorModel.findAuthorByID(args)
      }
    },
    recipe: {
      type: RecipeType,
      args: { id: { type: GraphQLString }},
      resolve (parentValue, args) {
        return RecipeModel.findRecipeByID(args)
      }
    },
    rate: {
      type: RateType,
      args: { id: { type: GraphQLString }},
      resolve (parentValue, args) {
        return RateModel.findRateByID(args)
      }
    }
  })
})

module.exports = RootQuery
