/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index.js"
import Button from "../components/Button.jsx"
import Input from "../components/Input.jsx"
import SideBar from "../components/SideBar.jsx"
import TimeSelect from "../components/TimeSelect.jsx"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const handleBackClick = () => navigate(-1)

  // Buscar tarefa e preencher formulário
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`)
      const data = await response.json()
      setTask(data)
      reset(data) // preenche campos do form
    }

    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          time: data.time,
          description: data.description,
        }),
      })

      if (!response.ok) {
        return toast.error("Erro ao salvar a tarefa.")
      }

      const newTask = await response.json()
      setTask(newTask)
      toast.success("Tarefa atualizada!")
    } catch (error) {
      toast.error("Falha ao conectar ao servidor.")
    }
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      return toast.error("Erro ao remover a tarefa.")
    }

    toast.success("Tarefa removida!")
    navigate("/")
  }

  if (!task) return <div>Carregando...</div>

  return (
    <div className="flex">
      <SideBar />

      <div className="w-full flex-1 space-y-6 p-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-1 text-xs">
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Remover tarefa
          </Button>
        </div>

        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-brand-white p-6 shadow">
            <Input
              id="title"
              label="Título"
              defaultValue={task.title}
              {...register("title", {
                validate: (value) =>
                  value.trim() !== "" || "O título é obrigatório.",
              })}
              errorMessage={errors.title?.message}
            />

            <TimeSelect
              defaultValue={task.time}
              {...register("time", {
                validate: (value) => value !== "" || "O horário é obrigatório.",
              })}
              errorMessage={errors.time?.message}
            />

            <Input
              id="description"
              label="Descrição"
              defaultValue={task.description}
              {...register("description", {
                validate: (value) =>
                  value.trim() !== "" || "A descrição é obrigatória.",
              })}
              errorMessage={errors.description?.message}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting && <LoaderIcon className="h-5 w-5 animate-spin" />}
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
