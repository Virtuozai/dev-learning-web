import { Subject } from './subject'

export type UserSubject = {
  id: number
  userId: number
  subjectId: number
  subject: Subject
  isLearned: boolean
  startDateTime: Date
  endDateTime: Date
}
