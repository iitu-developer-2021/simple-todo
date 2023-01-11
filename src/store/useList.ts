import { defineStore } from 'pinia'
import * as listApi from '../api/list'
import { useToast } from 'vue-toastification'
import type { List, OnlyList, Color } from '@/types'

const toast = useToast()

export const useListStore = defineStore('list', {
  state: () => ({
    list: [] as List[],
    addListItemLoading: false,
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
        })
        .catch(() => {
          toast.error('Не удалось удалить список')
        })
    },
    async addListItem(listItem: List) {
      console.log(listItem)

      this.addListItemLoading = true
      return listApi
        .addListItem({ id: listItem.id, name: listItem.name, colorId: listItem.colorId })
        .then(() => {
          this.list.push(listItem)
        })
        .catch((e) => {
          toast.error('Не удалось добавить список')
          throw e
        })
        .finally(() => {
          this.addListItemLoading = false
        })
    },
  },
})
