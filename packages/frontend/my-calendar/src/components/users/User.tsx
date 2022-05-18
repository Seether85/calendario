import React from 'react'
import { useUser } from '../../hooks/useUser'
import { Card } from '../base/Card'

import { useMatch } from '@tanstack/react-location'
import { EditCard } from '../base/EditCard'

export const User: React.FC = () => {
  const {
    params: { id, action },
  } = useMatch()

  const usersList = useUser(Number(id))

  if (usersList.isLoading) {
    return <div>Fetching posts...</div>
  }

  if (usersList.isError) {
    console.log(usersList.error)
    return <div>Error while fetching calendar events</div>
  }

  //   if (usersList.isFetched) {
  //     console.log(usersList.data)
  // }

  // const ActualCard = action !== undefined ? Card : EditCard

  return (
    <>
      {usersList.data?.map((user, index) =>
        action !== undefined ? (
          <Card
            key={index}
            id={user.id}
            title="Er mitico"
            content={user.firstname}
            note={user.lastname}
          />
        ) : (
          <EditCard
            key={index}
            id={user.id}
            title="Er mitico"
            content={user.firstname}
            note={user.lastname}
          />
        )
      )}
    </>
  )
}
