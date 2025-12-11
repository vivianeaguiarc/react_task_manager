/* eslint-disable no-unused-vars */
import DashboardCards from '../components/DashboardCards.jsx'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import TaskItem from '../components/TaskItem.jsx'
import { useGetTasks } from '../hooks/data/use-get-tasks.js'

const HomePage = () => {
  const { data: tasks = [] } = useGetTasks()
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header
          subtitle="Minhas tarefas"
          title="Organize suas tarefas diárias"
        />
        <DashboardCards />
        <div className="grid grid-cols-[1.5fr,1fr] gap-6">
          <div className="bg-white rounded-[10px] p-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Tarefas</h3>
              <span className="text-sm text-brand-dark-gray">
                Resumo das tarefas disponíveis
              </span>
            </div>
            <div className="space-y-3">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-[10px] p-6 space-y-6 flex items-center justify-center text-center">
            <p className="text-brand-primary font-semibold">
              "Conclua o que começou. Cada tarefa finalizada é uma versão mais
              forte de você mesma avançando."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
