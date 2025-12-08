/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }
    fetchTask()
  }, [taskId])
  return (
    <div>
      <h1>{task?.title}</h1>
      <p>{task?.description}</p>
    </div>
  )
}

export default TaskDetailsPage
