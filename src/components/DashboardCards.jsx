/* eslint-disable no-unused-vars */
/* eslint-disable simple-import-sort/imports */
import { HomeIcon, LoaderIcon, Tasks2Icon, TasksIcon } from '../assets/icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import DashboardCard from './DashboardCard'

const DashboardCards = () => {
  const { data: tasks = [] } = useGetTasks()

  const notStartedTasks = (
    tasks.filter((task) => task.status === 'not_started') ?? []
  ).length
  const inProgressTasks = (
    tasks.filter((task) => task.status === 'in_progress') ?? []
  ).length
  const completedTasks = (tasks.filter((task) => task.status === 'done') ?? [])
    .length
  const totalTasks = tasks.length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={totalTasks}
        secondText={'Tarefas totais'}
      />
      <DashboardCard
        icon={<HomeIcon />}
        mainText={notStartedTasks}
        secondText={'Tarefas não iniciadas'}
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        secondText={'Tarefas em andamento'}
      />

      <DashboardCard
        icon={<TasksIcon />}
        mainText={completedTasks}
        secondText={'Tarefas concluídas'}
      />
    </div>
  )
}

export default DashboardCards
