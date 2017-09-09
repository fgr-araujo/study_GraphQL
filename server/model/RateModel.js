const DBConnection = require('../connection/MysqlConnection')

const model = {}

model.findRateByID = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
          	id,
              person_id,
              recipe_id,
              rate
          FROM
          	rate_person_recipe
          WHERE id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results[0])
        })
      })
    })
}

model.findRatesByAuthor = ({id}) => {
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

model.findRatesByRecipeID = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
          	rate_person_recipe.id AS id,
            person.name AS person,
            recipe_detail.name AS recipe,
            rate_person_recipe.rate AS rate
          FROM
          	rate_person_recipe
          INNER JOIN person ON rate_person_recipe.person_id = person.id
          INNER JOIN recipe_detail ON rate_person_recipe.recipe_id = recipe_detail.id
          WHERE
          	recipe_detail.id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
          })
      })
  })
}

module.exports = model
