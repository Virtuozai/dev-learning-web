export enum UserRole {
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
  TeamLead = 'TeamLead',
  God = 'God',
}

export type User = {
  name: string
  lastname: string
  email: string
  teamName: string
  role: UserRole
}
