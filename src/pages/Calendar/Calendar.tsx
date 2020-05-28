import React, { FC, useState, useEffect, useContext } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Chip,
  Tabs,
  Tab,
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import { getUserCalendar, getUser } from 'data/api/users'
import { Calendar as CalendarModel } from 'types/models/calendar'
import { User } from 'types/models/user'
import { UserSubject } from 'types/models/subject'

import { USER_SUBJECT } from 'constants/routes'

import { UserContext } from 'App'

import { useStyles } from './styles'

const Calendar: FC = () => {
  const classes = useStyles()

  const user = useContext(UserContext)

  const [calendars, setCalendars] = useState<Array<CalendarModel>>([])
  const [activeTab, setActiveTab] = useState(0)
  const [users, setUsers] = useState<Array<User>>([])

  useEffect(() => {
    async function fetchCalendars() {
      if (!user) return

      const fetchedUserCalendars = await getUserCalendar(user.id)

      if (!fetchedUserCalendars) return

      await fetchedUserCalendars.forEach(async ({ item1 }) => {
        const fetchedUser = await getUser(item1)

        if (!fetchedUser) return fetchedUser

        setUsers(prevState => [...prevState, fetchedUser])

        return fetchedUser
      })

      setCalendars(fetchedUserCalendars)
    }

    fetchCalendars()
  }, [user])

  function renderTitle() {
    const titleText = 'Current month'

    return (
      <Typography variant="h3" align="center">
        {titleText}
      </Typography>
    )
  }

  function renderSubjects(userSubjects: Array<UserSubject>) {
    return userSubjects.map(({ id, subject, isLearned }) => (
      <Link to={USER_SUBJECT.replace(':id', id.toString())} key={id}>
        <Chip color={isLearned ? 'primary' : 'secondary'} label={subject.title} clickable />
      </Link>
    ))
  }

  function renderDays() {
    return calendars[activeTab]?.item2?.map(({ day, userSubjects }) => (
      <Card className={classes.memberItem} key={day}>
        <CardHeader title={day} />
        <Divider />
        <CardContent className={classes.day}>
          <Grid container alignItems="center">
            {renderSubjects(userSubjects)}
          </Grid>
        </CardContent>
      </Card>
    ))
  }

  function handleChange(_event: React.ChangeEvent<{}>, newValue: number) {
    setActiveTab(newValue)
  }

  function renderTabs() {
    return (
      <Tabs
        variant="scrollable"
        value={activeTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        {calendars.map(({ item1 }) => (
          <Tab label={users.find(({ id }) => id === item1)?.email} key={item1} />
        ))}
      </Tabs>
    )
  }

  return (
    <Container>
      <Paper elevation={6}>
        {renderTitle()}
        {renderTabs()}
        <Grid container alignItems="center" alignContent="center" justify="center">
          {renderDays()}
        </Grid>
      </Paper>
    </Container>
  )
}

export default Calendar
