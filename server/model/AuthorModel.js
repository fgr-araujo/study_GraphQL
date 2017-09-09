const DBConnection = require('../connection/MysqlConnection')

const model = {}

model.findAuthorByID = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
            person.id,
            person.name
          FROM
            person
          WHERE
          person.id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results[0])
          })
        })
  })
}

model.findAuthors = () => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
            person.id,
            person.name
          FROM
            person
          LIMIT 100;
          `, (err, results, fields) => {
            if (err) reject(err)
            resolve(results)
          })
        })
  })
}

model.findAuthorByRecipeID = ({id}) => {
  console.log('----', id)
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
          	person.id,
            person.name
          FROM
          	author_person_recipe
          INNER JOIN person ON author_person_recipe.person_id = person.id
          INNER JOIN recipe_detail ON author_person_recipe.recipe_id = recipe_detail.id
          WHERE
          	recipe_detail.id = ${id};
          `, (err, results, fields) => {
            if (err) reject(err)
            console.log('authors', results)
            resolve(results)
        })
      })
    })
}

model.findAuthorByRateID = ({id}) => {
  return new Promise((resolve, reject) => {
    DBConnection.getConnection()
      .then((pConnection) => {
        pConnection.query(`
          SELECT
            person.id,
            person.name
          FROM
            rate_person_recipe
          INNER JOIN person ON rate_person_recipe.person_id = person.id
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
