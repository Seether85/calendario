import React from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import Title from '../base/Title'

import { createHashHistory } from '@tanstack/react-location'
import { useCreateUser } from '../../hooks/useCreateUser'
import { useValidateInput } from '../../hooks/useValidateInput'

import { isFirstnameValid, isLastnameValid } from './validateFunctions'

import './styles/styles.css'

export const UserAddCard: React.FC = () => {
  const history = createHashHistory()
  const { mutate } = useCreateUser()

  const {
    value: enteredFirstname,
    isValid: firstnameIsValid,
    hasError: firstnameHasError,
    onChangeHandler: onFirstnameChangeHandler,
    onBlurHandler: onFirstnameBlurHandler,
  } = useValidateInput(isFirstnameValid)

  const {
    value: enteredLastname,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    onChangeHandler: onLastnameChangeHandler,
    onBlurHandler: onLastnameBlurHandler,
  } = useValidateInput(isLastnameValid)

  const add = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (
      firstnameIsValid &&
      !firstnameHasError &&
      lastnameIsValid &&
      !lastnameHasError
    ) {
      mutate({
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
        <form id="editable-card" onSubmit={add}>
          <Title>
            <Typography component="p" variant="h4">
              Nuovo utente
            </Typography>
          </Title>
          <Typography component="p" variant="h4">
            <input
              className={isFirstnameValidClass}
              type="text"
              name="firstname"
              placeholder="firstname"
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
              placeholder="lastname"
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
              <AddIcon fontSize="small" />
              Aggiungi
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
