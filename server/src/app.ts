import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  signupHandler,
  signinHandler,
} from './handlers/usersHandler'

const app: express.Application = express()
app.use(express.json())

// Users
app.post('/users/signup', asyncHandler(signupHandler))
app.post('/users/signin', asyncHandler(signinHandler))

export default app
