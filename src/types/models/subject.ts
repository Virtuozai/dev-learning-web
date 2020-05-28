export type Subject = {
  id: number
  title: string
  description: string
  parentId: number
}

export type UserSubject = {
  id: number
  userId: number
  subjectId: number
  isLearned: boolean
  endDateTime: Date
  startDateTime: Date
  subject: Subject
}
