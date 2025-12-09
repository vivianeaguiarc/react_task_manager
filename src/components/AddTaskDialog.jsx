/* eslint-disable no-unused-vars */
import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({
  isOpen,
  handleDialogClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const task = {
        id: uuidv4(),
        title: data.title,
        time: data.time,
        description: data.description,
        status: "not_started",
      }

      const response = await fetch("http://127.0.0.1:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      })

      if (!response.ok) {
        return onSubmitError()
      }

      const createdTask = await response.json()
      onSubmitSuccess(createdTask)
      handleDialogClose()
      reset({
        title: "",
        time: "morning",
        description: "",
      })
    } catch (error) {
      toast.error("Falha ao conectar ao servidor. Verifique o JSON Server.")
    }
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova tarefa
              </h2>

              <p className="mb-4 mt-1 text-brand-text-gray">
                Insira as informações abaixo
              </p>

              {/* FORM */}
              <form
                className="flex w-[336px] flex-col space-y-4"
                onSubmit={handleSubmit(handleSaveClick)}
              >
                {/* Título */}
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título"
                  disabled={isSubmitting}
                  errorMessage={errors?.title?.message}
                  {...register("title", {
                    required: "Título é obrigatório",
                    validate: (value) =>
                      value.trim() !== "" || "Título é obrigatório",
                  })}
                />

                {/* TimeSelect */}
                <TimeSelect
                  disabled={isSubmitting}
                  errorMessage={errors?.time?.message}
                  {...register("time", {
                    required: "Período é obrigatório",
                    validate: (value) =>
                      value.trim() !== "" || "Período é obrigatório",
                  })}
                />

                {/* Descrição */}
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  errorMessage={errors?.description?.message}
                  {...register("description", {
                    required: "Descrição é obrigatória",
                    validate: (value) =>
                      value.trim() !== "" || "Descrição é obrigatória",
                  })}
                />

                {/* Botões */}
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    type="button"
                    onClick={handleDialogClose}
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    className="flex w-full items-center justify-center"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      "Salvar"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDialogClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
}

export default AddTaskDialog
