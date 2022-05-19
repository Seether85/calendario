import React from 'react'
import { useUserList } from '../../hooks/useUserList'
import { UserCard } from './UserCard'

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
        <UserCard
          key={index}
          id={user.id}
          title="Er mitico"
          firstname={user.firstname}
          lastname={user.lastname}
        />
      ))}
    </>
  )
}
