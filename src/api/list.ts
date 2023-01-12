import axios from './index'
import type { OnlyList, Task } from '@/types'

const URLS = {
  lists: '/lists',
  tasks: '/tasks',
}

export const fetchLists = <T>() =>
  axios.get<T>(`${URLS.lists}?_expand=color&_embed=tasks`).then((response) => response.data)

export const deleteListItem = (listItemId: number) =>
  axios.delete(URLS.lists + '/' + listItemId).then((response) => response.data)

export const addListItem = (listItem: OnlyList) =>
  axios.post(URLS.lists, listItem).then((response) => response.data)

export const updateListTitle = (updatedListItem: OnlyList) =>
  axios
    .put(URLS.lists + '/' + updatedListItem.id, updatedListItem)
    .then((response) => response.data)

export const changeTask = (updatedTask: Task) =>
  axios.put(URLS.tasks + '/' + updatedTask.id, updatedTask).then((response) => response.data)

export const addTask = (task: Task) =>
  axios.post(URLS.tasks, task).then((response) => response.data)

export const deleteTask = (taskId: number) =>
  axios.delete(URLS.tasks + '/' + taskId).then((response) => response.data)

export const updateTask = (updatedTask: Task) =>
  axios.put(URLS.tasks + '/' + updatedTask.id, updatedTask).then((response) => response.data)
