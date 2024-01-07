import { getDb } from "./db.js"

const getAllUsers = () => {
  const usersQuery = 'select * from stack_user';
  return getDb().manyOrNone(usersQuery);
}

const getUserById = (userId) => {
  const userQuery = `select * from stack_user where id = $<userId>`
  return getDb().oneOrNone(userQuery, {userId})
}

const getQuestionsByUserId = (userId) => {
  const questionsQuery = `select * from question where owner_id = $<userId>`
  return getDb().manyOrNone(questionsQuery, {userId})
}

const getAllQuestions = () => {
  const questionsQuery = 'select * from question order by creation_date limit 1000'
  return getDb().manyOrNone(questionsQuery);
}

const getQuestionById = async (questionId) => {
  const questionsQuery = `select * from question where id = $<questionId>`
  const res = await getDb().oneOrNone(questionsQuery, {questionId})
  return res
}

const getAnswersByUserId = (userId) => {
  const answersQuery = `select * from answer where user_id = $<userId>`
  return getDb().manyOrNone(answersQuery, {userId})
}

const getAnswersByQuestionId = (questionId) => {
  const answersQuery = `select * from answer where question_id = $<questionId>`
  return getDb().manyOrNone(answersQuery, {questionId})
}

export const repository = {
  getAllUsers,
  getUserById,
  getAllQuestions,
  getQuestionsByUserId,
  getQuestionById,
  getAnswersByUserId,
  getAnswersByQuestionId
}
