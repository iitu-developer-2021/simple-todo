import axios from './index'
import type { OnlyList } from '@/types'

const URLS = {
  lists: '/lists',
}

export const fetchLists = <T>() =>
  axios.get<T>(`${URLS.lists}?_expand=color&_embed=tasks`).then((response) => response.data)

export const deleteListItem = (listItemId: number) =>
  axios.delete(URLS.lists + '/' + listItemId).then((response) => response.data)

export const addListItem = (listItem: OnlyList) =>
  axios.post(URLS.lists, listItem).then((response) => response.data)
