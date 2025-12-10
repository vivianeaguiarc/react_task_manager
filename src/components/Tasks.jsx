/* eslint-disable no-unused-vars */
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icons/index.js'
import { useGetTasks } from '../hooks/data/use-get-tasks.js'
import { useUpdateTask } from '../hooks/data/use-update-task.js'
import { taskQueryKey } from '../keys/queries.js'
import Header from './Header.jsx'
import TaskItem from './TaskItem.jsx'
import TasksSeparator from './TaskSeparator.jsx'

const Tasks = () => {
  const { data: tasks = [] } = useGetTasks()

  const morningTasks = tasks.filter((t) => t.time === 'morning')
  const afternoonTasks = tasks.filter((t) => t.time === 'afternoon')
  const nightTasks = tasks.filter((t) => t.time === 'evening')

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header
        subtitle={'Minhas tarefas'}
        title={'Organize suas tarefas diárias'}
      />
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
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
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
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
