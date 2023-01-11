import { defineStore } from 'pinia'
import * as colorApi from '@/api/color'
import type { Color } from '@/types'

export const useColorStore = defineStore('color', {
  state: () => ({
    colors: [] as Color[],
  }),
  actions: {
    fetchColors() {
      return colorApi.fetchColors<Color[]>().then((colors) => {
        this.colors = colors
      })
    },
  },
})
