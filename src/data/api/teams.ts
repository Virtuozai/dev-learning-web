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
