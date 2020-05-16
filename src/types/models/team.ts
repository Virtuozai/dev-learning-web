import { User } from './user'

export type Team = {
  id: number
  name: string
  description: string
  teamLead: User
}
