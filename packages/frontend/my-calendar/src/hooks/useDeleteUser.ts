import { useQueryClient, useMutation } from 'react-query'
import { DB } from '../DB'

async function deleteUser(id: number) {
  console.log(id)
  const response = await fetch(`${DB.url}/api/users/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  })

  const userId: number = await response.json()

  return userId
}

export const useDeleteUser = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient()

  return useMutation((id: number) => deleteUser(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}
