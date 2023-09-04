import {JwtObject} from '../types'
import  jwt from 'jsonwebtoken'

export const signJwt=(obj:JwtObject):string=>{
  return jwt.sign(obj,getJwtSecret(),{
    expiresIn:'1d'
  })
}

export const verifyJwt=(token:string):JwtObject=>{
  return jwt.verify(token,getJwtSecret()) as JwtObject
}

function getJwtSecret():string{
  const secret=process.env.JWT_SECRET
  if(!secret){
    console.error('Missing JWT secret')
    process.exit(1)
  }
  return secret
}
