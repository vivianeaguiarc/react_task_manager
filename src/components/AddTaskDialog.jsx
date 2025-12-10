/* eslint-disable no-unused-vars */
import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { useAddTask } from '../hooks/data/use-add-tasks'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({
  isOpen,
  handleDialogClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const { mutate: addTask } = useAddTask()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef()

  const handleSaveClick = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const task = {
      id: uuidv4(),
      title: data.title,
      time: data.time,
      description: data.description,
      status: 'not_started',
    }

    addTask(task, {
      onSuccess: (createdTask) => {
        onSubmitSuccess?.(createdTask)
        reset()
        handleDialogClose()
      },

      onError: () => {
        toast.error('Erro ao criar tarefa.')
        onSubmitError?.()
      },
    })
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
            className="fixed inset-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold">Nova tarefa</h2>

              <p className="mb-4 mt-1 text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                className="flex w-[336px] flex-col space-y-4"
                onSubmit={handleSubmit(handleSaveClick)}
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título"
                  disabled={isSubmitting}
                  errorMessage={errors?.title?.message}
                  {...register('title', {
                    required: 'Título é obrigatório',
                  })}
                />

                <TimeSelect
                  disabled={isSubmitting}
                  errorMessage={errors?.time?.message}
                  {...register('time', {
                    required: 'Período é obrigatório',
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  errorMessage={errors?.description?.message}
                  {...register('description', {
                    required: 'Descrição é obrigatória',
                  })}
                />

                {/* BOTÕES */}
                <div className="flex gap-3 mt-4">
                  <Button
                    size="large"
                    type="button"
                    color="secondary"
                    className="w-full py-3 text-base"
                    onClick={handleDialogClose}
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-base flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      'Salvar'
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
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
}

export default AddTaskDialog
