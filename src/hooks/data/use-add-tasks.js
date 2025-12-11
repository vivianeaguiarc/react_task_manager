import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKey } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.add(),

    mutationFn: async (task) => {
      const { data } = await api.post('/tasks', task)
      return data
    },

    onSuccess: () => {
      queryClient.invalidateQueries(taskQueryKey.getAll())
    },
  })
}
