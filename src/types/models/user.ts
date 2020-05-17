export enum UserRole {
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
  TeamLead = 'TeamLead',
  God = 'God',
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  team: {
    id: number
    name: string
  }
  role: UserRole
}
