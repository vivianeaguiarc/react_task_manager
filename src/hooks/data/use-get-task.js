import { useQuery } from '@tanstack/react-query'

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const res = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`)
      if (!res.ok) throw new Error('Erro ao carregar tarefa')

      const task = await res.json()
      onSuccess?.(task)
      return task
    },
  })
}
