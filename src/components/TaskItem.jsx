/* eslint-disable no-unused-vars */
import PropTypes from "prop-types"
import { useState } from "react"
import { toast } from "sonner"

import {
  CheckIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index.js"
import Button from "./Button.jsx"

const TaskItem = ({
  task,
  handleCheckBoxChange,
  onDeleteSucess, // mantém exatamente como no seu código
}) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false) // apenas corrigido nome

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error("Erro ao deletar tarefa. Tente novamente.")
    }

    // 🔥 AGUARDA 2s MOSTRANDO O LOADER ANTES DE REMOVER
    setTimeout(() => {
      onDeleteSucess(task.id)
      setDeleteIsLoading(false)
    }, 1000)
  }

  const getStatusClasses = () => {
    if (task.status === "done") return "bg-brand-primary/10 text-brand-primary"
    if (task.status === "in_progress")
      return "bg-brand-process/10 text-brand-process"
    if (task.status === "not_started")
      return "bg-brand-dark-blue/10 text-brand-dark-blue"
    return ""
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusClasses()} ${deleteIsLoading ? "bg-brand-process/20 text-brand-process opacity-70" : ""}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckBoxChange(task.id)}
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>

        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick}>
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-process" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "evening"]).isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]).isRequired,
  }).isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  onDeleteSucess: PropTypes.func.isRequired,
}

export default TaskItem
