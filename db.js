const pg = require('pg');
const faker = require('faker');
const uuid = require('uuid');
const { Client } = pg;

const client = new Client('postgres://localhost/acme_dictionary_db');

client.connect();

const sync = async () => {
  const SQL = `
    DROP TABLE IF EXISTS noun;
    DROP TABLE IF EXISTS verb;
    DROP TABLE IF EXISTS adjective;

    CREATE TABLE noun(
      id UUID PRIMARY KEY,
      name VARCHAR
      );
    CREATE TABLE verb(
      id UUID PRIMARY KEY,
      name VARCHAR
      );
    CREATE TABLE adjective(
      id UUID PRIMARY KEY,
      name VARCHAR
      );

    INSERT INTO noun (id, name)
    VALUES ('${uuid()}', '${faker.hacker.noun()}');
    INSERT INTO noun (id, name)
    VALUES ('${uuid()}', '${faker.hacker.noun()}');

    INSERT INTO verb (id, name)
    VALUES ('${uuid()}', '${faker.hacker.verb()}');
    INSERT INTO adjective (id, name)
    VALUES ('${uuid()}', '${faker.hacker.adjective()}');
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
  return response.rows[0];
};

const deleteVerb = async id => {
  const SQL = `DELETE FROM verb WHERE (id)=$1`;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const deleteAdjective = async id => {
  const SQL = `DELETE FROM adjective WHERE (id)=$1`;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const createNoun = async () => {
  const SQL = `INSERT INTO noun (id, name) VALUES('${uuid()}', '${faker.hacker.noun()}') returning *;`;
  const response = await client.query(SQL);
  return response.rows[0];
};

const createVerb = async () => {
  const SQL = `INSERT INTO verb (id, name) VALUES ('${uuid()}', '${faker.hacker.verb()}')returning *`;
  const response = await client.query(SQL);
  return response.rows[0];
};

const createAdjective = async () => {
  const SQL = `INSERT INTO adjective (id, name) VALUES ('${uuid()}', '${faker.hacker.adjective()}') returning *`;
  const response = await client.query(SQL);
  return response.rows[0];
};

module.exports = {
  sync,
  readNouns,
  readVerbs,
  readAdjectives,
  deleteNoun,
  deleteVerb,
  deleteAdjective,
  createNoun,
  createVerb,
  createAdjective,
};
