export enum UserRole {
  junior = 'junior',
  mid = 'mid',
  senior = 'senior',
  teamLead = 'teamLead',
  god = 'god',
}

export type User = {
  name: string
  lastname: string
  email: string
  teamName: string
  developerRole: UserRole
}
