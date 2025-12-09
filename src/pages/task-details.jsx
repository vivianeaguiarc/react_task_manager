// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import { useEffect, useRef, useState } from "react"
// import { Link, useNavigate, useParams } from "react-router-dom"

// import {
//   ArrowLeftIcon,
//   ChevronRightIcon,
//   LoaderIcon,
//   TrashIcon,
// } from "../assets/icons/index.js"

// import { toast } from "sonner"
// import Button from "../components/Button.jsx"
// import Input from "../components/Input.jsx"
// import SideBar from "../components/SideBar.jsx"
// import TimeSelect from "../components/TimeSelect.jsx"

// const TaskDetailsPage = () => {
//   const { taskId } = useParams()
//   const [task, setTask] = useState(null)
//   const [saveIsLoading, setSaveIsLoading] = useState(false)
//   const [errors, setErrors] = useState([])

//   const navigate = useNavigate()

//   const titleRef = useRef()
//   const descriptionRef = useRef()
//   const timeRef = useRef()

//   const handleBackClick = () => navigate(-1)

//   useEffect(() => {
//     const fetchTask = async () => {
//       const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`)
//       const data = await response.json()
//       setTask(data)
//     }

//     fetchTask()
//   }, [taskId])

//   const handleSaveClick = async () => {
//     setSaveIsLoading(true)

//     const title = titleRef.current.value
//     const description = descriptionRef.current.value
//     const time = timeRef.current.value

//     const validationErrors = []
//     if (!title.trim())
//       validationErrors.push({
//         inputName: "title",
//         message: "Título é obrigatório",
//       })
//     if (!time.trim())
//       validationErrors.push({
//         inputName: "time",
//         message: "Período é obrigatório",
//       })
//     if (!description.trim())
//       validationErrors.push({
//         inputName: "description",
//         message: "Descrição é obrigatória",
//       })

//     setErrors(validationErrors)

//     if (validationErrors.length > 0) {
//       setSaveIsLoading(false)
//       return
//     }

//     const updatedTask = {
//       ...task,
//       title,
//       time,
//       description,
//     }

//     const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedTask),
//     })

//     if (!response.ok) {
//       toast.error("Erro ao salvar a tarefa.")
//       setSaveIsLoading(false)
//       return
//     }
//     const newTask = await response.json()
//     setTask(newTask)
//     setSaveIsLoading(false)
//     // navigate("/") // volta para lista
//   }

//   const titleError = errors.find((e) => e.inputName === "title")
//   const timeError = errors.find((e) => e.inputName === "time")
//   const descriptionError = errors.find((e) => e.inputName === "description")

//   if (!task) return <div>Carregando...</div>

//   return (
//     <div className="flex">
//       <SideBar />

//       <div className="w-full flex-1 space-y-6 p-6 px-8 py-16">
//         <div className="flex w-full justify-between">
//           <div>
//             <button
//               onClick={handleBackClick}
//               className="mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-primary"
//             >
//               <ArrowLeftIcon />
//             </button>

//             <div className="flex items-center gap-1 text-xs">
//               <Link to="/" className="cursor-pointer text-brand-text-gray">
//                 Minhas tarefas
//               </Link>
//               <ChevronRightIcon className="text-brand-text-gray" />
//               <span className="font-semibold text-brand-primary">
//                 {task.title}
//               </span>
//             </div>

//             <h1 className="mt-2 text-xl font-semibold">{task.title}</h1>
//           </div>

//           <Button className="h-fit self-end" color="danger">
//             <TrashIcon />
//             Remover tarefa
//           </Button>
//         </div>

//         <div className="space-y-6 rounded-xl bg-brand-white p-6 shadow">
//           <Input
//             id="title"
//             label="Título"
//             defaultValue={task.title}
//             errorMessage={titleError?.message}
//             ref={titleRef}
//           />

//           <TimeSelect
//             defaultValue={task.time}
//             errorMessage={timeError?.message}
//             ref={timeRef}
//           />

//           <Input
//             id="description"
//             label="Descrição"
//             defaultValue={task.description}
//             errorMessage={descriptionError?.message}
//             ref={descriptionRef}
//           />
//         </div>

//         <div className="flex w-full justify-end gap-2">
//           <Button size="large" color="secondary" onClick={handleBackClick}>
//             Cancelar
//           </Button>

//           <Button size="large" color="primary" onClick={handleSaveClick}>
//             {saveIsLoading && <LoaderIcon className="animate-spin" />}
//             Salvar
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TaskDetailsPage
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react"
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
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleBackClick = () => navigate(-1)

  // Buscar tarefa
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`)
      const data = await response.json()
      setTask(data)
    }

    fetchTask()
  }, [taskId])

  // Salvar alterações
  const handleSaveClick = async () => {
    setSaveIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200)) // animação suave

      const title = titleRef.current.value
      const description = descriptionRef.current.value
      const time = timeRef.current.value

      const validationErrors = []
      if (!title.trim())
        validationErrors.push({
          inputName: "title",
          message: "Título é obrigatório",
        })
      if (!time.trim())
        validationErrors.push({
          inputName: "time",
          message: "Período é obrigatório",
        })
      if (!description.trim())
        validationErrors.push({
          inputName: "description",
          message: "Descrição é obrigatória",
        })

      setErrors(validationErrors)
      if (validationErrors.length > 0) return

      const updatedTask = {
        ...task,
        title,
        time,
        description,
      }

      const response = await fetch(`http://127.0.0.1:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      })

      if (!response.ok) {
        toast.error("Erro ao salvar a tarefa.")
        return
      }

      const newTask = await response.json()
      setTask(newTask)
      toast.success("Tarefa atualizada!")
    } catch (error) {
      toast.error("Falha ao conectar ao servidor.")
    } finally {
      setSaveIsLoading(false)
    }
  }

  const titleError = errors.find((e) => e.inputName === "title")
  const timeError = errors.find((e) => e.inputName === "time")
  const descriptionError = errors.find((e) => e.inputName === "description")

  if (!task) return <div>Carregando...</div>

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
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task.title}
              </span>
            </div>

            {/* Título */}
            <h1 className="mt-2 text-xl font-semibold">{task.title}</h1>
          </div>

          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Remover tarefa
          </Button>
        </div>

        {/* Form */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6 shadow">
          <Input
            id="title"
            label="Título"
            defaultValue={task.title}
            errorMessage={titleError?.message}
            ref={titleRef}
          />

          <TimeSelect
            defaultValue={task.time}
            errorMessage={timeError?.message}
            ref={timeRef}
          />

          <Input
            id="description"
            label="Descrição"
            defaultValue={task.description}
            errorMessage={descriptionError?.message}
            ref={descriptionRef}
          />
        </div>

        {/* Botões */}
        <div className="flex w-full justify-end gap-2">
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
            className="flex items-center gap-2"
          >
            {saveIsLoading && <LoaderIcon className="h-5 w-5 animate-spin" />}
            {saveIsLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
