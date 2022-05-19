import React from 'react'
import { useUser } from '../../hooks/useUser'
import { UserCard } from './UserCard'

import { useMatch } from '@tanstack/react-location'
import { UserEditCard } from './UserEditCard'

export const User: React.FC = () => {
  const {
    params: { id, action },
  } = useMatch()

  const usersList = useUser(Number(id))

  if (usersList.isLoading) {
    return <div>Fetching users...</div>
  }

  if (usersList.isError) {
    console.log(usersList.error)
    return <div>Error while fetching users</div>
  }

  //   if (usersList.isFetched) {
  //     console.log(usersList.data)
  // }

  // const ActualCard = action !== undefined ? Card : UserEditCard

  return (
    <>
      {usersList.data?.map((user, index) =>
        action !== undefined ? (
          <UserCard
            key={index}
            id={user.id}
            title="Er mitico"
            firstname={user.firstname}
            lastname={user.lastname}
          />
        ) : (
          <UserEditCard
            key={index}
            id={user.id}
            title="Er mitico"
            firstname={user.firstname}
            lastname={user.lastname}
          />
        )
      )}
    </>
  )
}
