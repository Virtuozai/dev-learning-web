import { Comment } from 'types/models/comment'

import api from './api'

const COMMENT_API_ENDPOINT = 'comments'
const SUBJECT_COMMENTS_API_ENDPOINT = 'comments/subject/:id'
const UPDATE_COMMENT_API_ENDPOINT = 'comments/:id'
const USER_SUBJECT_API_ENDPOINT = 'comments/userSubject/:id'

export const getSubjectComments = async (id: string) => {
  try {
    const response = await api.get<Array<Comment>>(SUBJECT_COMMENTS_API_ENDPOINT.replace(':id', id))

    return response.data
  } catch (ex) {
    return null
  }
}

export const getUserSubjectComments = async (id: string) => {
  try {
    const response = await api.get<Array<Comment>>(USER_SUBJECT_API_ENDPOINT.replace(':id', id))

    return response.data
  } catch (ex) {
    return null
  }
}

export type CreateCommentArgs = {
  subjectId?: number
  text: string
  userId?: number
  userSubjectId?: number
}

export const createComment = async (args: CreateCommentArgs) => {
  try {
    const response = await api.post(COMMENT_API_ENDPOINT, args)

    return response
  } catch (ex) {
    return null
  }
}

export const updateComment = async (commentId: string, comment: Comment) => {
  try {
    const response = await api.put(UPDATE_COMMENT_API_ENDPOINT.replace(':id', commentId), comment)

    return response
  } catch (ex) {
    return null
  }
}
