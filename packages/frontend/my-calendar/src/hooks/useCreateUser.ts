import { useQueryClient, useMutation } from 'react-query'
import { DB } from '../DB'

import { UserType } from '../types/UserType'

async function postUser(data: Omit<UserType, 'id'>) {
  // console.log(data)
  const response = await fetch(`${DB.url}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const userId: number = await response.json()

  return userId
}

export const useCreateUser = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  return useMutation((data: Omit<UserType, 'id'>) => postUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}
