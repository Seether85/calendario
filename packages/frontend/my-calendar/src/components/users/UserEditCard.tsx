import React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import Title from '../base/Title'

import { createHashHistory } from '@tanstack/react-location'
import { useUpdateUser } from '../../hooks/useUpdateUser'
import { useValidateInput } from '../../hooks/useValidateInput'

import { isFirstnameValid, isLastnameValid } from './validateFunctions'

import { UserType } from '../../types/UserType'

import './styles/styles.css'

type Props = UserType & { title: string }

export const UserEditCard: React.FC<Props> = ({
  id,
  title,
  firstname,
  lastname,
}) => {
  const history = createHashHistory()

  const { mutate } = useUpdateUser()

  const {
    value: enteredFirstname,
    isValid: firstnameIsValid,
    hasError: firstnameHasError,
    onChangeHandler: onFirstnameChangeHandler,
    onBlurHandler: onFirstnameBlurHandler,
  } = useValidateInput(isFirstnameValid, firstname)

  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    onChangeHandler: onLastnameChangeHandler,
    onBlurHandler: onLastnameBlurHandler,
  } = useValidateInput(isLastnameValid, lastname)

  const edit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (
      firstnameIsValid &&
      !firstnameHasError &&
      lastnameIsValid &&
      !lastnameHasError
    ) {
      mutate({
        id: id,
        firstname: enteredFirstname,
        lastname: enteredLastname,
      })
    }
  }

  const isFirstnameValidClass = firstnameHasError ? 'error' : ''
  const isLastnameValidClass = lastnameHasError ? 'error' : ''

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <form id="editable-card" onSubmit={edit}>
          <Title>
            <Typography component="p" variant="h4">
              {title}
            </Typography>
          </Title>
          <Typography component="p" variant="h4">
            <input
              className={isFirstnameValidClass}
              type="text"
              name="firstname"
              onChange={onFirstnameChangeHandler}
              onBlur={onFirstnameBlurHandler}
              value={enteredFirstname}
            />
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            <input
              className={isLastnameValidClass}
              type="text"
              name="lastname"
              onChange={onLastnameChangeHandler}
              onBlur={onLastnameBlurHandler}
              value={enteredLastname}
            />
          </Typography>
          <section style={{ marginTop: '1rem' }}>
            <Button
              variant="contained"
              type="submit"
              size="small"
              color="success"
              style={{ cursor: 'pointer' }}
            >
              Modifica
            </Button>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={history.back}
              style={{ cursor: 'pointer' }}
            >
              Indietro
            </Button>
          </section>
        </form>
      </Paper>
    </Grid>
  )
}
