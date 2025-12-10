import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useGetTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/tasks')
      return res.data
    },
  })
}
