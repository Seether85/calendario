import { useQuery } from 'react-query'
import { DB } from '../DB'

import { UserType } from '../types/UserType'

async function fetchUsers(id: number) {
  const response = await fetch(`${DB.url}/api/users/${id}`)
  const users: UserType[] = await response.json()
  return users
}

export const useUser = (id: number) =>
  useQuery(['users', id], () => fetchUsers(id), {
    staleTime: 1000,
    retry: false,
  })
