const pg = require('pg');
const faker = require('faker');
const { Client } = pg;

const client = new Client('postgres://localhost/acme_dictionary_db');

client.connect();

const sync = async () => {
  const SQL = `
    DROP TABLE IF EXISTS noun;
    DROP TABLE IF EXISTS verb;
    DROP TABLE IF EXISTS adjective;

    CREATE TABLE noun(
      id SERIAL PRIMARY KEY,
      name VARCHAR
      );
    CREATE TABLE verb(
      id SERIAL PRIMARY KEY,
      name VARCHAR
      );
    CREATE TABLE adjective(
      id SERIAL PRIMARY KEY,
      name VARCHAR
      );

    INSERT INTO noun (name)
    VALUES ('${faker.hacker.noun()}');
    INSERT INTO noun (name)
    VALUES ('${faker.hacker.noun()}');

    INSERT INTO verb (name)
    VALUES ('${faker.hacker.verb()}');
    INSERT INTO adjective (name)
    VALUES ('${faker.hacker.adjective()}');
  `;
  await client.query(SQL);
};

const readNouns = async () => {
  const SQL = `
  SELECT * FROM noun`;
  const response = await client.query(SQL);
  return response.rows;
};

const readVerbs = async () => {
  const SQL = `
  SELECT * FROM verb`;
  const response = await client.query(SQL);
  return response.rows;
};

const readAdjectives = async () => {
  const SQL = `
  SELECT * FROM adjective`;
  const response = await client.query(SQL);
  return response.rows;
};

const deleteNoun = async id => {
  const SQL = `
  DELETE FROM noun WHERE (id)=$1
  `;
  const response = await client.query(SQL, [id]);
  console.log(response);
  return response.rows[0];
};
deleteNoun(1);

// const deleteVerb = async id => {
//   const SQL = `
//   SELECT * FROM verb WHERE id=$1
//   `;
//   const response = await client.query(SQL, [id]);
//   return response.rows;
// };

// const deleteAdjective = async id => {
//   const SQL = `
//   SELECT * FROM adjective WHERE id=$1
//   `;
//   const response = await client.query(SQL, [id]);
//   return response.rows;
// };

// const createNoun = () => {}
// const createVerb = () => {}
// const createAdjective = () => {}

module.exports = {
  sync,
  readNouns,
  readVerbs,
  readAdjectives,
  deleteNoun,
  // deleteVerb,
  // deleteAdjective,
  // createNoun,
  // createVerb,
  // createAdjective,
};

// *********************************/
// CURRENT STATUS
// not able to find the route for app.delete
// need to build out post
