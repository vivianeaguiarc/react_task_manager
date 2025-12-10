import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      // 🔥 força o loader a aparecer por mais tempo
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const { data: updatedTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: newTask.title.trim(),
          description: newTask.description.trim(),
          time: newTask.time,
        }
      )
      queryClient.setQueryData(['tasks'], (oldTasks = []) =>
        oldTasks.map((oldTask) =>
          oldTask.id === taskId ? updatedTask : oldTask
        )
      )

      return updatedTask
    },
  })
}
