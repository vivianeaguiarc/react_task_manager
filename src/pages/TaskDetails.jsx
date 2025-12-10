/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
import { useDeleteTask } from '../hooks/data/use-delete-task.js'
import { useGetTask } from '../hooks/data/use-get-task.js'
import { useUpdateTask } from '../hooks/data/use-update-task.js'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { mutate: updateTask, isPending: updateIsLoading } =
    useUpdateTask(taskId)

  const { mutate: deleteTask, isPending: deleteIsLoading } =
    useDeleteTask(taskId)

  const { data: task, isLoading } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  })

  const handleBackClick = () => navigate(-1)

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
