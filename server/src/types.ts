import {RequestHandler} from 'express'
export interface User {
  id: string
  firstName: string
  lastName: string
  userName: string
  email: string
  password: string
  rouls:string
}

export interface Filme {
  id: string
  name: string
  originalName: string
  poster: string
  year: string
  url: string,
  imdbRating?:string,
  list250?:number,
  watched?:boolean,
  library?:boolean
}



export interface Mywatched {
  userId: string
  filmeId: string
}
export interface Mylibrary extends Mywatched {}

export interface JwtObject {
  userId: string
}

type WithError<T> = T & {error: string}
type WithUser<T> = T & {user: User}

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>
export type ExpressHandlerUser<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<WithUser<Req>>,
  any
>

export type ParamExpressHandler<P, Req, Res> = RequestHandler<
  P,
  Partial<WithError<Res>>,
  Partial<WithUser<Req>>,
  any
>
export type AuthExpressHandler<P, Req, Res> = RequestHandler<
  P,
  Partial<WithError<Req>>,
  Partial<WithUser<Res>>,
  any
>
