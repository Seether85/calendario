import { useQuery } from 'react-query'
import { DB } from '../DB'

import { UserType } from '../types/UserType'

async function fetchUsers() {
  const response = await fetch(`${DB.url}/api/users`)
  const events: UserType[] = await response.json()
  return events
}

export const useUserList = () =>
  useQuery('users', fetchUsers, {
    staleTime: 1000,
    retry: false,
  })
