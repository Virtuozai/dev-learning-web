import { Subject } from 'types/models/subject'

import api from './api'

const SUBJECTS_API_ENDPOINT = 'subjects'

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
