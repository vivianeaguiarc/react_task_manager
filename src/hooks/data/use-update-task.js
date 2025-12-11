import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { taskQueryKey } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),

    mutationFn: async (data) => {
      // delay artificial
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const res = await api.patch(`/tasks/${taskId}`, {
        title: data?.title?.trim(),
        description: data?.description?.trim(),
        time: data?.time,
        status: data?.status,
      })

      return res.data
    },

    onSuccess: () => {
      // Atualiza lista
      queryClient.invalidateQueries(taskQueryKey.getAll())

      // Atualiza detalhes
      queryClient.invalidateQueries(taskQueryKey.getOne(taskId))
    },
  })
}
