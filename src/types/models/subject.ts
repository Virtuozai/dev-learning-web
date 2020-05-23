export type Subject = {
  id: number
  title: string
  description: string
  parentId: number
}

export type UserSubject = {
  id: number
  isLearned: boolean
  endDateTime: Date
  startDateTime: Date
  subject: Subject
}
