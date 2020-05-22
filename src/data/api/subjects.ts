import { Subject } from 'types/models/subject'

import { UserSubject } from 'types/models/userSubject'
import api from './api'

const SUBJECTS_API_ENDPOINT = 'subjects'
const SUBJECT_API_ENDPOINT = 'subjects/:id'

const USER_SUBJECTS_API_ENDPOINT = 'UserSubjects/User/:id'

export const getUserSubjects = async (id: number) => {
  try {
    const response = await api.get<Array<UserSubject>>(
      USER_SUBJECTS_API_ENDPOINT.replace(':id', id.toString()),
    )

    return response.data
  } catch (ex) {
    return null
  }
}

export const getSubjects = async () => {
  try {
    const response = await api.get<Array<Subject>>(SUBJECTS_API_ENDPOINT)

    return response.data
  } catch (ex) {
    return null
  }
}

export type CreateSubjectArgs = {
  title: string
  description: string
  parentId?: number
}

export const createSubject = async (args: CreateSubjectArgs) => {
  try {
    const response = await api.post(SUBJECTS_API_ENDPOINT, args)

    return response
  } catch (ex) {
    return null
  }
}

export const getSubject = async (id: string) => {
  try {
    const response = await api.get<Subject>(SUBJECT_API_ENDPOINT.replace(':id', id))

    return response.data
  } catch (ex) {
    return null
  }
}

export type UpdateSubjectArgs = {
  id: string
  title: string
  description: string
}

export const updateSubject = async (args: UpdateSubjectArgs) => {
  try {
    const response = await api.put(SUBJECT_API_ENDPOINT.replace(':id', args.id), args)

    return response
  } catch (ex) {
    return null
  }
}
