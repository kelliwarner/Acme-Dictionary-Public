const pg = require('pg');
const faker = require('faker');
const { Client } = pg;

const client = new Client('postgres://localhost/acme_dictionary_db');

client.connect();

// faker.hacker.noun()
// faker.hacker.verb()
// faker.hacker.adjective()

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
  SELECT * FROM noun WHERE id=$1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows;
};

// put my CRUD functions here

module.exports = {
  sync,
  readNouns,
  readVerbs,
  readAdjectives,
  deleteNoun,
  //crud
};

// CREATE TABLE verb(
//   id SERIAL PRIMARY KEY,
//   word VARCHAR
//   );

// CREATE TABLE adjective(
//   id SERIAL PRIMARY KEY,
//   word VARCHAR
//   );

//   DROP TABLE IF EXISTS verb;
// DROP TABLE IF EXISTS adjective;

//******************************** */

//CURRENT STATUS -
// YOURE DOING GREAT SWEETIEEEEEEEE
// ALL THE GETS ARE WORKING!!!

// current delete doesnt work , red error in console

// need to build out post
