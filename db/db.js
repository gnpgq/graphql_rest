import pgPromise from 'pg-promise';

const config = {
  host: 'localhost',
  port: 5432,
  database: 'stackoverflow_db',
  user: 'gnpgq',
  allowExitOnIdle: true,
  idleTimeoutMillis: 200,
  max: 30 // use up to 30 connections
};

let db

export const getDb = () => {
  if (db === undefined || db === null) {
    const pgp = pgPromise({})
    db = pgp(config)
  }
  return db
}

// let pool

// export const getDb = () => {
//   if (!pool) {
//     pool = new Pool(config)
//   }
//   return pool
// }
