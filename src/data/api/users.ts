import { User } from 'types/models/user'
import { Calendar } from 'types/models/calendar'

import api from './api'

const USERS_API_ENDPOINT = 'users'
const USER_API_ENDPOINT = 'users/:id'
const USER_LOGIN_API_ENDPOINT = 'users/login'
const CURRENT_USER_API_ENDPOINT = 'users/current_user'
const LOGOUT_USER_API_ENDPOINT = 'users/logout'
const TEAM_USERS_API_ENDPOINT = 'users/team_users/:id'
const USER_SUBJECT_API_ENDPOINT = 'usersubjects'
const USER_CALENDAR_API_ENDPOINT = 'users/:id/calendar'

export const getUser = async (id: number) => {
  try {
    const response = await api.get<User>(USER_API_ENDPOINT.replace(':id', id.toString()))

    return response.data
  } catch (ex) {
    return null
  }
}

export const getUserCalendar = async (id: number) => {
  try {
    const response = await api.get<Array<Calendar>>(
      USER_CALENDAR_API_ENDPOINT.replace(':id', id.toString()),
    )

    return response.data
  } catch (ex) {
    return null
  }
}

export const getTeamUsers = async (id: number) => {
  try {
    const response = await api.get<Array<User>>(
      TEAM_USERS_API_ENDPOINT.replace(':id', id.toString()),
    )

    return response.data
  } catch (ex) {
    return null
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get<User>(CURRENT_USER_API_ENDPOINT)

    return response
  } catch (ex) {
    return null
  }
}

export const getUsers = async () => {
  try {
    const response = await api.get<Array<User>>(USERS_API_ENDPOINT)

    return response.data
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
    const response = await api.post(USER_LOGIN_API_ENDPOINT, userCreds)

    return response
  } catch (ex) {
    return null
  }
}

type RegisterRequestArgs = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const register = async (registerCreds: RegisterRequestArgs) => {
  try {
    const response = await api.post(USERS_API_ENDPOINT, registerCreds)

    return response
  } catch (ex) {
    return null
  }
}

export const logout = async () => {
  try {
    const response = await api.post(LOGOUT_USER_API_ENDPOINT)

    return response
  } catch (ex) {
    return null
  }
}

export const addSubjectToUser = async (
  userId: number,
  subjectId: number,
  startDateTime: Date,
  endDateTime: Date,
) => {
  try {
    const response = await api.post(USER_SUBJECT_API_ENDPOINT, {
      userId,
      subjectId,
      startDateTime,
      endDateTime,
    })

    return response
  } catch (ex) {
    return null
  }
}
