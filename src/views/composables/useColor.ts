import { useColorStore } from '@/store/useColor'
import { storeToRefs } from 'pinia'

export const useColor = () => {
  const colorStore = useColorStore()
  const { fetchColors } = colorStore
  const { colors } = storeToRefs(colorStore)

  return {
    fetchColors,
    colors,
  }
}
