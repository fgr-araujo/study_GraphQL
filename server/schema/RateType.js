const RateModel = require('../model/RateModel')
const RecipeModel = require('../model/RecipeModel')
const AuthorModel = require('../model/AuthorModel')

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const RateType = new GraphQLObjectType({
  name: 'Rate',
  fields: () => ({
    id: { type: GraphQLString },
    rate: { type: GraphQLInt },
    person: {
      type: require('./AuthorType'),
      resolve (parentValue, args) {
        return AuthorModel.findAuthorByRateID(parentValue)
      }
    },
    recipe: {
      type: require('./RecipeType'),
      resolve (parentValue) {
        return RecipeModel.findRecipeByRateID(parentValue)
      }
    }
  })
})

module.exports = RateType
