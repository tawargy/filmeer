import crypto from 'crypto'
import {ExpressHandler, User} from '../types'
import {db} from '../datastore'
import {signJwt} from '../utils/jwtAuth'

function hashPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512')
    .toString('hex')
}

type SignupReq = Pick<
  User,
  'email' | 'firstName' | 'lastName' | 'userName' | 'password'
>
interface SignupRes {
  user: Pick<User, 'email' | 'firstName' | 'lastName' | 'userName' | 'id'>
  token: string
}

export const signupHandler: ExpressHandler<SignupReq, SignupRes> = async (
  req,
  res,
) => {
  const {firstName, lastName, userName, email, password} = req.body
  if (!firstName || !lastName || !userName || !email || !password) {
    return res.status(404).send({error: 'All fields ara required'})
  }
  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(userName))
  if (existing) {
    return res.status(401).send({error: 'User is exist allready'})
  }
  const user: User = {
    id: crypto.randomUUID(),
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    email: email,
    password: hashPassword(password),
    rouls: 'user',
  }
  await db.createUser(user)
  user.password = undefined!
  user.rouls = undefined!
  const token = signJwt({userId: user.id})

  res.status(200).send({user: user, token: token})
}

interface SigninReq {
  login: string
  password: string
}
interface SigninRes extends SignupRes {}

export const signinHandler: ExpressHandler<SigninReq, SigninRes> = async (
  req,
  res,
) => {
  const {login, password} = req.body
  if (!login || !password) {
    return res.status(404).send({error: 'All fiealds are required'})
  }
  const existing =
    (await db.getUserByUsername(login)) || (await db.getUserByEmail(login))
  if (!existing || existing.password !== hashPassword(password)) {
    return res.status(401).send({error: 'user or password not correct'})
  }

  const token = signJwt({userId: existing?.id})
  res.status(200).send({
    user: {
      email: existing?.email,
      firstName: existing?.firstName,
      lastName: existing?.lastName,
      userName: existing?.userName,
      id: existing?.id,
    },
    token: token,
  })
}
