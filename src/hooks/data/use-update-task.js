import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      // 🔥 força o loader a aparecer por mais tempo
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTask.title.trim(),
          description: newTask.description.trim(),
          time: newTask.time,
        }),
      })

      if (!response.ok) throw new Error()

      const updatedTask = await response.json()

      queryClient.setQueryData(['tasks'], (oldTasks = []) =>
        oldTasks.map((oldTask) =>
          oldTask.id === taskId ? updatedTask : oldTask
        )
      )

      return updatedTask
    },
  })
}
