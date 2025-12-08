/* eslint-disable no-undef */
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const TaskDetailsPage = () => {
  const { taskId } = useParams()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
    }
    fetchTask()
  }, [taskId])
  return <h1>Task Details</h1>
}

export default TaskDetailsPage
