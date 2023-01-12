import { defineStore } from 'pinia'
import * as listApi from '../api/list'
import { useToast } from 'vue-toastification'
import type { List, OnlyList } from '@/types'
import { router } from '@/router'
import type { Task } from '@/types'
import type { Color } from '@/types'
import { List as ListType } from '@/types'

const toast = useToast()

const generateId = () => Math.ceil(Math.random() * 10000000) + 1

export const useListStore = defineStore('list', {
  state: () => ({
    list: [] as List[],
    addListItemLoading: false,
    addTaskLoading: false,
  }),
  actions: {
    async fetchList() {
      return listApi.fetchLists<List[]>().then((list) => {
        this.list = list
      })
    },
    async deleteListItem(listItemId: number) {
      return listApi
        .deleteListItem(listItemId)
        .then(() => {
          this.list = this.list.filter((listItem) => listItem.id !== listItemId)
          router.push({ path: '/' })
        })
        .catch((e) => {
          console.error(e.message)
          toast.error('Не удалось удалить список')
        })
    },
    async addListItem(name: string, color: Color) {
      const listItem: ListType = {
        id: generateId(),
        name: name,
        color: color,
        colorId: color.id as number,
        tasks: [],
      }

      this.addListItemLoading = true
      return listApi
        .addListItem({ id: listItem.id, name: listItem.name, colorId: listItem.colorId })
        .then(() => {
          this.list.push(listItem)
        })
        .catch((e) => {
          console.error(e.message)
          toast.error('Не удалось добавить список')
          throw e
        })
        .finally(() => {
          this.addListItemLoading = false
        })
    },
    async editListTitle(id: number) {
      const editedTask = this.list.find((task) => task.id === id)
      if (!editedTask) return

      const editedText = window.prompt('Измените название задачи', editedTask?.name || '')
      if (!editedText) return

      const formattedEditTask: OnlyList = {
        id: editedTask.id,
        name: editedText,
        colorId: editedTask.colorId,
      }

      return listApi
        .updateListTitle(formattedEditTask)
        .then(() => {
          editedTask.name = editedText
        })
        .catch((e) => {
          console.error(e.mesage)
          toast.error('Не удалось изменить название')
        })
    },
    changeCompletedStatus(taskId: number) {
      const touchedListTask = this.list.reduce<Task[]>((result, listItem) => {
        const foundTask = listItem.tasks.find((task) => task.id === taskId)
        if (foundTask) result.push(foundTask)
        return result
      }, [])

      const [foundListTask] = touchedListTask

      if (!foundListTask) return

      const updatedListTask = {
        ...foundListTask,
        completed: !foundListTask.completed,
      }

      return listApi
        .changeTask(updatedListTask)
        .then(() => {
          foundListTask.completed = !foundListTask.completed
        })
        .catch((e) => {
          console.error(e.message)
          toast.error('Не удалось поменять значение checked')
        })
    },
    addTask(listId: number, value: string) {
      const newTask: Task = {
        id: generateId(),
        completed: false,
        listId: listId,
        text: value,
      }

      this.addTaskLoading = true
      return listApi
        .addTask(newTask)
        .then(() => {
          this.list.forEach((listItem) => {
            if (listItem.id === listId) {
              listItem.tasks.push(newTask)
            }
          })
        })
        .catch((e) => {
          console.error(e.message)
          toast.error('Не удалось добавить задачу')
        })
        .finally(() => {
          this.addTaskLoading = false
        })
    },
    deleteTask(listId: number, taskId: number) {
      return listApi
        .deleteTask(taskId)
        .then(() => {
          const list = this.list.find((listItem) => listItem.id === listId)
          if (!list) return
          const foundIndex = list.tasks.findIndex((task) => task.id === taskId)
          if (foundIndex !== -1) list.tasks.splice(foundIndex, 1)
        })
        .catch((e) => {
          console.error(e.message)
          toast.error('Не удалось удалить задачу')
        })
    },
    updateTask(listId: number, taskId: number) {
      const foundList = this.list.find((listItem) => listItem.id === listId)
      if (!foundList) return

      const neededTask = foundList.tasks.find((task) => task.id === taskId)
      if (!neededTask) return

      const updatedText = window.prompt('Введите новое название', neededTask.text)
      if (!updatedText) return

      const generatedTask: Task = {
        id: neededTask.id,
        text: updatedText,
        completed: neededTask.completed,
        listId: neededTask.listId,
      }

      return listApi
        .updateTask(generatedTask)
        .then(() => {
          neededTask.text = updatedText
        })
        .catch((e) => {
          console.error(e.message)
          toast.error('Не удалось отредактировать название')
        })
    },
  },
})
