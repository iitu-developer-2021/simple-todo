import { computed, onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useListStore } from '@/store/useList'
import { storeToRefs } from 'pinia'

export const useTask = () => {
  const route = useRoute()
  const router = useRouter()
  const listStore = useListStore()
  const { list } = storeToRefs(listStore)
  const paramsId = ref()

  onMounted(() => {
    const foundListIndex = list.value.findIndex((listItem) => listItem.id === paramsId.value)
    if (!paramsId.value || foundListIndex === -1) return router.push({ path: '/' })
  })

  const tasks = computed(() =>
    paramsId.value ? list.value.filter((listItem) => listItem.id === paramsId.value) : list.value
  )

  watch(
    () => route.params.id,
    () => {
      paramsId.value = +route.params.id
    },
    {
      immediate: true,
    }
  )

  return {
    tasks,
  }
}
