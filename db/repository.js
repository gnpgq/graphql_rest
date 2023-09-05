import { db } from "./db.js"

const getUsers = () => {
  const usersQuery = 'select id, display_name, link from users';
  return db.manyOrNone(usersQuery);
}

export const repository = {
  getUsers
}
