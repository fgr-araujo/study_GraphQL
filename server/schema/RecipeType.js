const AuthorModel = require('../model/AuthorModel')
const RateModel = require('../model/RateModel')
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const RecipeType = new GraphQLObjectType({
  name: 'Recipe',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    rate: { type: GraphQLInt },
    rates: {
      type: new GraphQLList(require('./RateType')),
      resolve (parentValue) {
        return RateModel.findRatesByRecipeID(parentValue)
      }
    },
    authors: {
      type: new GraphQLList(require('./AuthorType')),
      resolve (parentValue) {
        console.log(parentValue)
        return AuthorModel.findAuthorByRecipeID(parentValue)
      }
    }
  })
})

module.exports = RecipeType
