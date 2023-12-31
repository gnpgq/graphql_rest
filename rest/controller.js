import express from 'express'
import { repository } from '../db/repository.js'

const router = express.Router()

// ścieżka /users zwracająca wszystkich użytkowników
router.get(
  '/users',
  async (req, res) => {
    const users = await repository.getUsers()
    res.send(users)
  }
)

// ścieżka /users/{id} zwracająca dane użytkownika o danym identyfikatorze
router.get(
  '/users/:id',
  async (req, res) => {
    const {id} = req.params
    const user = await repository.getUserById(id)
    res.send(user)
  }
)

// ścieżka /questions zwracająca wszystkie pytania
router.get(
  '/questions',
  async (req, res) => {
    const users = await repository.getAllQuestions()
    res.send(users)
  }
)

// ścieżka /questions/{id} zwracająca pytanie o danym identyfikatorze
router.get(
  '/questions/:id',
  async (req, res) => {
    const {id} = req.params
    const users = await repository.getQuestionById(id)
    res.send(users)
  }
)

router.get(
  '/questions/:id/answers',
  async(req, res) => {
    const {id} = req.params
    const answers = await repository.getAnswersByQuestionId(id)
    res.send(answers)
  }
)

export default { router }