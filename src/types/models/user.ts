export enum UserRole {
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
  TeamLead = 'TeamLead',
  God = 'God',
}

export type User = {
  name: string
  lastName: string
  email: string
  teamName: string
  role: UserRole
}
