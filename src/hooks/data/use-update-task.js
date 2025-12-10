import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKey } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      // 🔥 força o loader a aparecer por mais tempo
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const { data: updatedTask } = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      })
      queryClient.setQueryData(taskQueryKey.getAll(), (oldTasks) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTask
          }
          return task
        })
      })
      queryClient.setQueryData(taskQueryKey.getOne(taskId), updatedTask)
    },
  })
}
