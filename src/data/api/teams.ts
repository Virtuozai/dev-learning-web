import { Team } from 'types/models/team'

import api from './api'

const TEAMS_API_ENDPOINT = 'teams'

export const getTeams = async () => {
  try {
    const response = await api.get<Array<Team>>(TEAMS_API_ENDPOINT)

    return response.data
  } catch (ex) {
    return null
  }
}

export const createTeam = async (name: string, description: string, teamLeadId: number) => {
  try {
    const response = await api.post(TEAMS_API_ENDPOINT, { name, description, teamLeadId })

    return response
  } catch (ex) {
    return null
  }
}
