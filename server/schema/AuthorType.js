const RecipeType = require('./RecipeType')
const RecipeModel = require('../model/RecipeModel')
const RateType = require('./RateType')
const RateModel = require('../model/RateModel')

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    recipes: {
      type: new GraphQLList(RecipeType),
      resolve (parentValue) {
        return RecipeModel.findRecipesByAuthor(parentValue)
      }
    },
    rates: {
      type: new GraphQLList(RateType),
      resolve (parentValue) {
        return RateModel.findRatesByAuthor(parentValue)
      }
    }
  })
})

module.exports = AuthorType
