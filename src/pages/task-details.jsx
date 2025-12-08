/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "../assets/icons/index.js"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import InputLabel from "../components/InputLabel.jsx"
import SideBar from "../components/SideBar.jsx"
import TimeSelect from "../components/TimeSelect.jsx"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      console.log("RESPOSTA DO SERVIDOR:", data)
      setTask(data)
    }

    fetchTask()
  }, [taskId])

  return (
    <div className="flex">
      <SideBar />

      <div className="w-full flex-1 space-y-6 p-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            {/* Botão Voltar */}
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-xs">
              <span
                onClick={handleBackClick}
                className="cursor-pointer text-brand-text-gray"
              >
                Minhas tarefas
              </span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            {/* Título grande */}
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button className={`h-fit self-end`} color="danger">
            <TrashIcon />
            Remover tarefa
          </Button>
        </div>
        <div className="space-y-6 rounded-xl bg-brand-white p-6 shadow">
          <div>
            <Input id="title" label="Titulo" value={task?.title} />
          </div>

          <div>
            <TimeSelect value={task?.time} />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
