import { ref } from 'vue'

export const useToggle = (defaultValue = false) => {
  const show = ref(defaultValue)
  const setShowOn = () => (show.value = true)
  const setShowOff = () => (show.value = false)
  const setShow = (newShowValue: boolean) => (show.value = newShowValue)

  return {
    show,
    setShowOff,
    setShowOn,
    setShow,
  }
}
