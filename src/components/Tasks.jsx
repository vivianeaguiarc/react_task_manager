/* eslint-disable no-unused-vars */
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons/index.js'
import { useGetTasks } from '../hooks/data/use-get-tasks.js'
import AddTaskDialog from './AddTaskDialog.jsx'
import Button from './Button.jsx'
import TaskItem from './TaskItem.jsx'
import TasksSeparator from './TaskSeparator.jsx'

const Tasks = () => {
  const queryClient = useQueryClient()

  // 🔥 Fallback seguro evita crash
  const { data: tasks = [] } = useGetTasks()

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks.filter((t) => t.time === 'morning')
  const afternoonTasks = tasks.filter((t) => t.time === 'afternoon')
  const nightTasks = tasks.filter((t) => t.time === 'evening')

  const handleDialogClose = () => setAddTaskDialogIsOpen(false)

  const onDeleteTaskSuccess = (taskId) => {
    queryClient.setQueryData(['tasks'], (old = []) =>
      old.filter((task) => task.id !== taskId)
    )
    toast.success('Tarefa deletada com sucesso!')
  }

  const handleTaskCheckBoxChange = (taskId) => {
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task

      if (task.status === 'not_started')
        return { ...task, status: 'in_progress' }
      if (task.status === 'in_progress') return { ...task, status: 'done' }
      return { ...task, status: 'not_started' }
    })

    queryClient.setQueryData(['tasks'], updated)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <span className="text-md font-semibold text-brand-primary">
          Minhas Tarefas
        </span>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon /> Nova tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleDialogClose={handleDialogClose}
          />
        </div>
      </div>

      <div className="mb-3 rounded-xl bg-white p-6">
        {/* MANHÃ */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para o período da manhã.
            </p>
          )}

          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxChange={handleTaskCheckBoxChange}
              onDeleteSucess={() => onDeleteTaskSuccess(task.id)}
            />
          ))}
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />

          {afternoonTasks.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para o período da tarde.
            </p>
          )}

          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxChange={handleTaskCheckBoxChange}
              onDeleteSucess={() => onDeleteTaskSuccess(task.id)}
            />
          ))}
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />

          {nightTasks.length === 0 && (
            <p className="text-center text-sm text-brand-text-gray">
              Nenhuma tarefa para o período da noite.
            </p>
          )}

          {nightTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxChange={handleTaskCheckBoxChange}
              onDeleteSucess={() => onDeleteTaskSuccess(task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
