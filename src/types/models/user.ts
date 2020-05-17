export enum UserRole {
  Junior = 0,
  Mid = 1,
  Senior = 2,
  TeamLead = 3,
  God = 4,
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  team: {
    id: number
    name: string
  } | null
  teamId: number
  role: UserRole
}
