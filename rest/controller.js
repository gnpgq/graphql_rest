import express from 'express'
import { repository } from '../db/repository.js'

const router = express.Router()

router.get(
  '/users',
  async (req, res) => {
    const users = await repository.getUsers()
    res.send(users)
  }
)

export default { router }