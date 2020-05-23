import { UserSubject } from './subject'

export type Calendar = {
  item1: number
  item2: Array<{
    day: number
    userSubjects: Array<UserSubject>
  }>
}
