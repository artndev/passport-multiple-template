export {}
import { Request } from 'express'

declare global {
  export interface IUser {
    id: number
    username: string
    password: string
    email: string
    googleId: string
    githubId: string
  }
}
