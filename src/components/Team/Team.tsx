import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Typography, Card, CardHeader, CardContent, Divider, Button } from '@material-ui/core'

import { Team as TeamModel } from 'types/models/team'

import { USER, TEAM } from 'constants/routes'

import { useStyles } from './styles'

type Props = {
  team: TeamModel
  teamLeadEmail?: string
}

const Team: FC<Props> = ({ team, teamLeadEmail }: Props) => {
  const classes = useStyles()

  const { id, name, teamLeadId } = team

  return (
    <Card className={classes.memberItem}>
      <CardHeader
        title={
          <Link to={TEAM.replace(':id', id.toString())}>
            <Button size="small">{name}</Button>
          </Link>
        }
      />
      <Divider />
      <CardContent>
        <Grid container alignItems="center">
          <Typography variant="h6">Team lead:</Typography>
          <Link to={USER.replace(':id', teamLeadId.toString())} className={classes.alignRight}>
            <Button size="small">{teamLeadEmail || 'Team has no team lead'}</Button>
          </Link>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Team
