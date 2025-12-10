import { useQuery } from '@tanstack/react-query'

import { taskQueryKey } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: taskQueryKey.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)
      onSuccess?.(task)
      return task
    },
  })
}
