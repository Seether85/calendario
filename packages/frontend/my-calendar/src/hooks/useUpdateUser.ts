import { useQueryClient, useMutation } from 'react-query'
import { DB } from '../DB'

import { UserType } from '../types/UserType'

async function putUser(data: UserType) {
  // console.log(data)
  const response = await fetch(`${DB.url}/api/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const userId: number = await response.json()

  return userId
}

export const useUpdateUser = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  return useMutation((data: UserType) => putUser(data), {
    onSuccess: (id) => {
      queryClient.invalidateQueries(['users', id])
    },
  })
}
