import { ref } from 'vue'
import { useListStore } from '@/store/useList'
import { storeToRefs } from 'pinia'
import { Color, List as ListType } from '@/types'

export const useList = () => {
  const title = ref('')
  const chosenColor = ref<Color>({ id: 0, name: '', hex: '' })
  const showPopUp = ref(false)

  const listStore = useListStore()
  const { fetchList, deleteListItem, addListItem } = listStore
  const { list, addListItemLoading } = storeToRefs(listStore)

  const addListItemWrapper = () => {
    return addListItem(title.value, chosenColor.value).then(() => {
      title.value = ''
      chosenColor.value = {
        id: Math.ceil(Math.random() * 10000000) + 1,
        name: '',
        hex: '',
      }
      showPopUp.value = false
    })
  }

  return {
    fetchList,
    deleteListItem,
    addListItem: addListItemWrapper,
    addListItemLoading,
    list,
    title,
    chosenColor,
    showPopUp,
  }
}
