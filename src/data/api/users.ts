import api from './api'

const USERS_API_ENDPOINT = 'users'
const USER_API_ENDPOINT = 'users/:id'
const USER_LOGIN_API_ENDPOINT = 'users/login'
const CURRENT_USER_API_ENDPOINT = 'users/current_user'

export const getUser = async (id: number) => {
  try {
    const user = api.get(USER_API_ENDPOINT.replace(':id', id.toString()))

    return user
  } catch (ex) {
    return null
  }
}

export const getCurrentUser = async () => {
  try {
    const user = api.get(CURRENT_USER_API_ENDPOINT)

    return user
  } catch (ex) {
    return null
  }
}

export const getUsers = async () => {
  try {
    const users = api.get(USERS_API_ENDPOINT)

    return users
  } catch (ex) {
    return null
  }
}

type LoginRequestArgs = {
  email: string
  password: string
}

export const login = async (userCreds: LoginRequestArgs) => {
  try {
    const token = await api.post(USER_LOGIN_API_ENDPOINT, userCreds)

    return token
  } catch (ex) {
    return null
  }
}

type RegisterRequestArgs = {
  firstname: string
  lastname: string
  email: string
  password: string
}

export const register = async (registerCreds: RegisterRequestArgs) => {
  try {
    const token = await api.post(USERS_API_ENDPOINT, registerCreds)

    return token
  } catch (ex) {
    return null
  }
}
