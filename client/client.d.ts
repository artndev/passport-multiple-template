import { AxiosResponse } from 'axios'

export {}

declare global {
  export interface IUser {
    id: number
    username: string
    password: string
    email: string
    googleId: string
    githubId: string
  }

  export interface IAuthContext {
    auth: IUser | undefined
    setAuth: (auth: IUser | undefined) => void | undefined
  }

  export interface IAuthFormProps {
    formTitle: string
    onSubmit: (...args) => void
    err: IAxiosError
    withEmail?: boolean
    withSocials?: boolean
  }

  export type IAxiosErrorResponse = AxiosResponse | undefined
}
