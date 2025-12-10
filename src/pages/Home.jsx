/* eslint-disable no-unused-vars */
import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from '../assets/icons'
import DashboardCard from '../components/DashboardCard'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { useGetTasks } from '../hooks/data/use-get-tasks.js'

const HomePage = () => {
  const { data: tasks } = useGetTasks()
  // const notStartedTasks = tasks?.filter((task) => task.status === 'not_started').length || 0
  const inProgressTasks =
    tasks?.filter((task) => task.status === 'in_progress').length || 0
  const completedTasks =
    tasks?.filter((task) => task.status === 'done').length || 0
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header
          subtitle={'Minhas tarefas'}
          title={'Organize suas tarefas diárias'}
        />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length || 0}
            secondText={'Tarefas disponíveis'}
          />
          <DashboardCard
            icon={<TasksIcon />}
            mainText={completedTasks || 0}
            secondText={'Tarefas concluídas'}
          />
          <DashboardCard
            icon={<LoaderIcon />}
            mainText={inProgressTasks || 0}
            secondText={'Tarefas em andamento'}
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="5"
            secondText={'Água'}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
