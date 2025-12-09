/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'
import SideBar from '../components/SideBar.jsx'
import TimeSelect from '../components/TimeSelect.jsx'

const TaskDetailsPage = () => {
  const queryClient = useQueryClient()
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  // =============== UPDATE TASK ===============
  const { mutate: updateTask, isPending: updateIsLoading } = useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      // 🔥 força o loader a aparecer por mais tempo
      await new Promise((resolve) => setTimeout(resolve, 1200))

      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title.trim(),
          description: data.description.trim(),
          time: data.time,
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

  // =============== DELETE TASK (FALTAVA!) ===============
  const { mutate: deleteTask, isPending: deleteIsLoading } = useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error()

      const deletedTask = await response.json()
      queryClient.setQueryData(['tasks'], (oldTasks = []) => {
        return oldTasks.filter((oldTask) => oldTask.id !== deletedTask.id)
      })

      return true
    },
  })

  // =============== GET TASK ===============
  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const res = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`)
      if (!res.ok) throw new Error('Erro ao carregar tarefa')
      return await res.json()
    },
    onSuccess: (data) => reset(data),
  })

  const handleBackClick = () => navigate(-1)

  // =============== SAVE (PATCH SEM MUTATION) ===============
  // const handleSaveClick = async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1200))

  //     const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     })

  //     if (!response.ok) {
  //       return toast.error("Erro ao salvar a tarefa.")
  //     }

  //     await response.json()
  //     toast.success("Tarefa atualizada!")
  //   } catch {
  //     toast.error("Falha ao conectar ao servidor.")
  //   }
  // }
  const handleSaveClick = (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success('Tarefa atualizada!')
      },
      onError: () => {
        toast.error('Erro ao atualizar tarefa.')
      },
    })
  }

  // =============== DELETE HANDLER ===============
  const handleDeleteClick = () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa removida!')
        navigate('/')
      },
      onError: () => toast.error('Erro ao remover a tarefa.'),
    })
  }

  if (isLoading) return <div>Carregando...</div>

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
              {...register('title', {
                validate: (value) =>
                  value.trim() !== '' || 'O título é obrigatório.',
              })}
              errorMessage={errors.title?.message}
            />

            <TimeSelect
              defaultValue={task.time}
              {...register('time', {
                validate: (value) => value !== '' || 'O horário é obrigatório.',
              })}
              errorMessage={errors.time?.message}
            />

            <Input
              id="description"
              label="Descrição"
              defaultValue={task.description}
              {...register('description', {
                validate: (value) =>
                  value.trim() !== '' || 'A descrição é obrigatória.',
              })}
              errorMessage={errors.description?.message}
            />
          </div>

          <div className="flex w-full justify-end gap-3 mt-2">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updateIsLoading || deleteIsLoading}
              className="flex items-center gap-2"
            >
              {(updateIsLoading || deleteIsLoading) && (
                <LoaderIcon className="h-5 w-5 animate-spin" />
              )}
              {updateIsLoading || deleteIsLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
