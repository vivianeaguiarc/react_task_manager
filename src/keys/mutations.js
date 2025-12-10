export const taskMutationKeys = {
  add: () => ['add-task', 'create'],
  update: (taskId) => ['update-task', taskId, 'update'],
  delete: (taskId) => ['delete-task', taskId, 'delete'],
}
