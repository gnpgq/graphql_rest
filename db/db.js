import pgPromise from 'pg-promise';

const config = {
  host: 'localhost',
  port: 5432,
  database: 'stackoverflow_db',
  user: 'gnpgq',
  max: 30 // use up to 30 connections
};

const pgp = pgPromise({})

export const db = pgp(config)
