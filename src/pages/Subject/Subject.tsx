import React, { FC, useState, useEffect, ChangeEvent, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  TextField,
  Grid,
  Avatar,
  Button,
  Paper,
  Container,
  Divider,
  Snackbar,
  Card,
  Fab,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { Edit, Save, Cancel, People, Send, Add } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { getSubject, updateSubject } from 'data/api/subjects'
import { getSubjectComments, createComment } from 'data/api/comments'
import { getTeamUsers, addSubjectToUser } from 'data/api/users'

import { Subject as SubjectType } from 'types/models/subject'
import { Comment } from 'types/models/comment'
import { UserRole, User } from 'types/models/user'

import { UserContext } from 'App'

import { useStyles } from './styles'

const Subject: FC = () => {
  const { id } = useParams()
  const classes = useStyles()

  const user = useContext(UserContext)
  const canUserEdit = user?.role === UserRole.God

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [subject, setSubject] = useState<SubjectType | null>(null)
  const [editedSubject, setEditedSubject] = useState<SubjectType | null>(null)

  const [comments, setComments] = useState<Array<Comment>>([])
  const [newComment, setNewComment] = useState<string>('')

  const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState<boolean>(false)
  const [teamUsers, setTeamUsers] = useState<Array<User>>([])
  const [selectedTeamUserId, setSelectedTeamUserId] = useState<number | null>(null)

  const [error, setError] = useState<string | null>(null)

  const fetchSubject = useCallback(async () => {
    if (!id) return

    const fetchedSubject = await getSubject(id)

    if (!fetchedSubject) return

    setSubject(fetchedSubject)
    setEditedSubject(fetchedSubject)
  }, [id])

  const fetchComments = useCallback(async () => {
    if (!id) return

    const fetchedComments = await getSubjectComments(id)

    if (!fetchedComments) return

    setComments(fetchedComments)
  }, [id])

  const fetchTeamUsers = useCallback(async () => {
    if (!user?.teamId) return

    const fetchedUsers = await getTeamUsers(user.teamId)

    if (!fetchedUsers) return

    setTeamUsers(fetchedUsers)
  }, [user])

  useEffect(() => {
    fetchSubject()
  }, [fetchSubject])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  useEffect(() => {
    fetchTeamUsers()
  }, [fetchTeamUsers])

  function handleSubjectTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setEditedSubject(prevState => {
      if (!prevState) return prevState

      const newState = { ...prevState, title: value }

      return newState
    })
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setEditedSubject(prevState => {
      if (!prevState) return prevState

      const newState = { ...prevState, description: value }

      return newState
    })
  }

  const handleSaveClick = async () => {
    setError(null)

    if (!isEditing) {
      setIsEditing(true)

      return
    }

    if (!id || !editedSubject?.title) {
      setError('Missing required values (title or subject id cannot be empty)!')

      return
    }

    const response = await updateSubject({ ...editedSubject, id })

    if (response?.status !== 204) {
      setError('Something went wrong')
    } else {
      await fetchSubject()

      setIsEditing(false)
    }
  }

  function renderTitle() {
    if (!subject) return null

    if (!isEditing)
      return (
        <Typography className={classes.between} variant="h3" align="center">
          {subject.title}
        </Typography>
      )

    const titleTextFieldClass = `${classes.betweenBlocks} ${classes.horizontal}`

    return (
      <TextField
        className={titleTextFieldClass}
        variant="outlined"
        required
        label="Subject title"
        onChange={handleSubjectTitleChange}
        value={editedSubject?.title}
      />
    )
  }

  function renderComments() {
    return comments.map(({ id: commentId, text, user: commentUser }) => (
      <Grid
        className={classes.between}
        container
        alignItems="center"
        alignContent="center"
        key={commentId}
      >
        <Grid item xs={12} sm={1}>
          <Avatar className={classes.betweenBlocks}>
            {commentUser.firstName[0] + commentUser.lastName[0]}
          </Avatar>
        </Grid>
        <Grid item xs={11} sm={10}>
          <Card className={classes.broaderPadding}>
            <Typography>
              {text}
              {user?.id === commentUser.id && (
                <Fab className={classes.horizontal} size="small">
                  <Edit />
                </Fab>
              )}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    ))
  }

  function handleCommentChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setNewComment(value)
  }

  async function handleSendClick() {
    if (!user?.id) {
      setError('No user')

      return
    }
    if (!newComment) {
      setError('Comment cannot be empty')

      return
    }

    const response = await createComment({
      subjectId: Number(id),
      userId: user.id,
      text: newComment,
    })

    if (response?.status !== 204) setError('Failed to send your message')

    await fetchComments()
  }

  function renderWriteCommentBlock() {
    const sendButtonClass = `${classes.betweenBlocks} ${classes.alignRight}`

    return (
      <Grid container>
        <TextField
          className={classes.between}
          label="Write a comment about this subject"
          multiline
          fullWidth
          value={newComment}
          onChange={handleCommentChange}
        />
        <Button
          className={sendButtonClass}
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<Send />}
          onClick={handleSendClick}
        >
          Send
        </Button>
      </Grid>
    )
  }

  function renderEditorialButtons() {
    return (
      <>
        <Button
          className={classes.betweenBlocks}
          size="small"
          variant="contained"
          color="secondary"
          startIcon={isEditing ? <Save /> : <Edit />}
          onClick={handleSaveClick}
        >
          {isEditing ? 'Save' : 'Edit subject'}
        </Button>
        {isEditing && (
          <Button
            className={classes.betweenBlocks}
            size="small"
            variant="contained"
            startIcon={<Cancel />}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        )}
      </>
    )
  }

  function handleSelectUserModalClose() {
    setIsSelectUserModalOpen(false)
  }

  function handleSelectUseClick() {
    setIsSelectUserModalOpen(true)
  }

  function handleUserSelect(
    event: ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
  ) {
    const {
      target: { value },
    } = event

    setSelectedTeamUserId(value as number)
  }

  async function assignSubjectToUser() {
    if (!selectedTeamUserId) {
      setError('User should be selected')

      return
    }

    const response = await addSubjectToUser(selectedTeamUserId, Number(id))

    if (response?.status !== 204) setError('Something went wrong')

    setIsSelectUserModalOpen(false)
  }

  function renderAddSubjectModal() {
    const title = (
      <Typography className={classes.between} variant="h6" align="center">
        Select user
      </Typography>
    )

    return (
      <Dialog open={isSelectUserModalOpen} onClose={handleSelectUserModalClose}>
        <Container>
          {title}
          <FormControl variant="outlined" fullWidth className={classes.betweenBlocks}>
            <InputLabel id="parent-select-label">Selected User</InputLabel>
            <Select
              labelId="parent-select-label"
              id="parent-select"
              value={selectedTeamUserId || ''}
              onChange={handleUserSelect}
            >
              <div className={classes.scrollable}>
                {teamUsers.map(({ id: userId, firstName, lastName }) => (
                  <MenuItem key={userId} value={userId}>
                    <Avatar>
                      {firstName[0]}
                      {lastName[0]}
                    </Avatar>
                    {firstName} {lastName}
                  </MenuItem>
                ))}
              </div>
            </Select>
          </FormControl>

          <Button
            className={classes.betweenBlocks}
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            fullWidth
            onClick={assignSubjectToUser}
          >
            Assign
          </Button>
        </Container>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Dialog>
    )
  }

  return (
    <>
      <Container className={classes.top}>
        <Paper elevation={6}>
          {renderTitle()}
          <Divider />
          <div className={classes.horizontal}>
            {canUserEdit && isEditing ? (
              <TextField
                className={classes.betweenBlocks}
                variant="outlined"
                label="Description"
                multiline
                fullWidth
                value={editedSubject?.description}
                onChange={handleDescriptionChange}
              />
            ) : (
              <Typography className={classes.betweenBlocks}>{subject?.description}</Typography>
            )}

            {canUserEdit && renderEditorialButtons()}
            {(canUserEdit || user?.role === UserRole.TeamLead) && (
              <Button
                className={classes.betweenBlocks}
                size="small"
                variant="contained"
                startIcon={<People />}
                onClick={handleSelectUseClick}
              >
                Assign to team member
              </Button>
            )}

            <Typography className={classes.top} variant="h4">
              Comments
            </Typography>
            {renderComments()}
            {renderWriteCommentBlock()}
          </div>
        </Paper>
      </Container>
      {renderAddSubjectModal()}
      <Snackbar open={error !== null}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Subject
