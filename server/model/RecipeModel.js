const DBConnection = require('../connection/MysqlConnection')

const model = {}

model.findRecipeByID = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
          	id,
            name,
            rate
          FROM
          	recipe_detail
          WHERE
          	id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results[0])
        })
      })
    })
}

model.findRecipesByAuthor = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
          	recipe_detail.id,
              recipe_detail.name,
              recipe_detail.rate
          FROM
          	author_person_recipe
          INNER JOIN recipe_detail ON author_person_recipe.recipe_id = recipe_detail.id
          INNER JOIN person ON author_person_recipe.person_id = person.id
          WHERE
          	person.id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
          })
      })
  })
}

model.findRecipeByRateID = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
          	recipe_detail.id AS id,
          	recipe_detail.name AS name,
            recipe_detail.rate AS rate
          FROM
          	rate_person_recipe
          INNER JOIN recipe_detail ON rate_person_recipe.recipe_id = recipe_detail.id
          WHERE
          	rate_person_recipe.id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results[0])
          })
      })
  })
}

module.exports = model
