import React from 'react'
import { useUserList } from '../../hooks/useUserList'
import { Card } from '../base/Card'

export const UserList = () => {
  const usersList = useUserList()

  if (usersList.isLoading) {
    return <div>Fetching posts...</div>
  }

  if (usersList.isError) {
    console.log(usersList.error)
    return <div>Error while fetching calendar events</div>
  }

  // if (usersList.isFetched) {
  //   console.log(usersList.data)
  // }

  return (
    <>
      {usersList.data?.map((user, index) => (
        <Card
          key={index}
          id={user.id}
          title="Er mitico"
          content={user.firstname}
          note={user.lastname}
        />
      ))}
    </>
  )
}
