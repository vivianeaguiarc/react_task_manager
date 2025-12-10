import { useQuery } from '@tanstack/react-query'

import { taskQueryKey } from '../../keys/queries'
import { api } from '../../lib/axios'

export function useGetTasks() {
  return useQuery({
    queryKey: taskQueryKey.getAll(),
    queryFn: async () => {
      const res = await api.get('/tasks')
      return res.data
    },
  })
}
