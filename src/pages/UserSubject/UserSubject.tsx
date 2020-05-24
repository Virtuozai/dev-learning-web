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
} from '@material-ui/core'
import { Edit, Save, People, Send } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { getUserSubjectComments, createComment, updateComment } from 'data/api/comments'
import { getUserSubject, updateUserSubject, getSubject } from 'data/api/subjects'

import { UserSubject as UserSubjectType, Subject } from 'types/models/subject'
import { Comment } from 'types/models/comment'
import { UserRole } from 'types/models/user'

import { UserContext } from 'App'

import { useStyles } from './styles'

const UserSubject: FC = () => {
  const { id: subjectId } = useParams()
  const classes = useStyles()

  const user = useContext(UserContext)
  const canUserEdit = user?.role === UserRole.God

  const [userSubject, setUserSubject] = useState<UserSubjectType | null>(null)
  const [subject, setSubject] = useState<Subject | null>(null)

  const [comments, setComments] = useState<Array<Comment>>([])
  const [newComment, setNewComment] = useState<string>('')
  const [editedComment, setEditedComment] = useState<string>('')
  const [editedCommentId, setEditedCommentId] = useState<number | null>(null)

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const fetchSubject = useCallback(async () => {
    if (!subjectId) return

    const fetchedUserSubject = await getUserSubject(subjectId)

    if (!fetchedUserSubject) return

    setUserSubject(fetchedUserSubject)

    const fetchedSubject = await getSubject(fetchedUserSubject.subjectId.toString())

    if (!fetchedSubject) return

    setSubject(fetchedSubject)
  }, [subjectId])

  const fetchComments = useCallback(async () => {
    if (!subjectId) return

    const fetchedComments = await getUserSubjectComments(subjectId)

    if (!fetchedComments) return

    setComments(fetchedComments)
  }, [subjectId])

  useEffect(() => {
    fetchSubject()
  }, [fetchSubject])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  function renderTitle() {
    if (!subject) return null

    return (
      <Typography className={classes.between} variant="h3" align="center">
        {subject?.title}
      </Typography>
    )
  }

  function handleCommentEdit(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setEditedComment(value)
  }

  async function handleEditSave() {
    const editedCommentEntity = comments.find(
      ({ id: commentEntityId }) => commentEntityId === editedCommentId,
    )

    if (!editedCommentEntity || !editedComment || !editedCommentId) {
      setError('Comment cannot be empty')

      return
    }

    const response = await updateComment(editedCommentId.toString(), {
      ...editedCommentEntity,
      text: editedComment,
    })

    if (response?.status !== 204) {
      setError('something went wrong')

      return
    }

    await fetchComments()

    setEditedCommentId(null)
    setEditedComment('')
  }

  const handleCommentEditing = (commentId: number) => () => {
    const editedCommentInitialText = comments.find(
      ({ id: commentEntityId }) => commentEntityId === commentId,
    )?.text

    setEditedCommentId(commentId)
    setEditedComment(editedCommentInitialText || '')
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
            {editedCommentId === commentId ? (
              <>
                <TextField
                  className={classes.betweenBlocks}
                  variant="outlined"
                  multiline
                  fullWidth
                  value={editedComment}
                  onChange={handleCommentEdit}
                />
                <Fab className={classes.horizontal} size="small">
                  <Save onClick={handleEditSave} />
                </Fab>
              </>
            ) : (
              <Typography>
                {text}
                {user?.id === commentUser.id && (
                  <Fab className={classes.horizontal} size="small">
                    <Edit onClick={handleCommentEditing(commentId)} />
                  </Fab>
                )}
              </Typography>
            )}
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
      userSubjectId: Number(subjectId),
      userId: Number(user.id),
      text: newComment,
    })

    if (!response?.data) {
      setError('Failed to send your message')

      return
    }

    await fetchComments()

    setNewComment('')
    setError(null)
  }

  async function markAsLearned() {
    if (!userSubject) return

    const response = await updateUserSubject({ ...userSubject, isLearned: true })

    if (response?.status !== 204) {
      setError(`Couldn't mark subject as learnt`)

      return
    }

    setError(null)
    setSuccess('Subject successfully marked as learnt')
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

  return (
    <>
      <Container className={classes.top}>
        <Paper elevation={6}>
          {renderTitle()}
          <Divider />
          <div className={classes.horizontal}>
            <Typography className={classes.betweenBlocks}>{subject?.description}</Typography>

            {(canUserEdit || user?.role === UserRole.TeamLead) && (
              <Button
                className={classes.betweenBlocks}
                size="small"
                variant="contained"
                startIcon={<People />}
                onClick={markAsLearned}
              >
                Set as learnt
              </Button>
            )}

            <Divider />
            <Typography className={classes.top} variant="h4">
              Comments
            </Typography>
            {renderComments()}
            {renderWriteCommentBlock()}
          </div>
        </Paper>
      </Container>
      <Snackbar open={error !== null}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success !== null}>
        <Alert variant="filled" severity="success">
          {success}
        </Alert>
      </Snackbar>
    </>
  )
}

export default UserSubject
