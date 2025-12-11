import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKey } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),

    mutationFn: async () => {
      await api.delete(`/tasks/${taskId}`)
      return taskId // ← devolve apenas o ID
    },

    onSuccess: (deletedId) => {
      queryClient.setQueryData(taskQueryKey.getAll(), (oldTasks = []) =>
        oldTasks.filter((task) => task.id !== deletedId)
      )
    },
  })
}
