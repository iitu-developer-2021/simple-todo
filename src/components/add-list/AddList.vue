<template>
  <div class="add-list">
    <button class="add-list__btn" @click.prevent="setShowOn">
      <BaseSvg icon="plus" size="15" />
      <span class="add-list__btn-text">Добавить папку</span>
    </button>
    <AddList
      :colors="colors"
      v-show="show"
      :add-task-loading="loading"
      @closeAddPanel="setShowOff"
      @addList="addNewList"
      chosen-color="localChosenColor"
      @update:chosen-color="setLocalChosenColor"
      :model-value="localTitle"
      @update:model-value="setLocalTitle"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, watchEffect, ref } from 'vue'
import AddList from './AddListPopUp.vue'
import { Color } from '@/types'
import { useToggle } from '@/composables/useState'

export default defineComponent({
  props: {
    showPopUp: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    chosenColor: {
      type: Object as PropType<Color>,
      default: () => ({
        id: 0,
        name: '',
        hex: '',
      }),
    },
    colors: {
      type: Array as PropType<Color[]>,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['addList', 'update:title', 'update:chosenColor'],
  setup(props, context) {
    const { show, setShowOn, setShowOff, setShow } = useToggle()
    const localTitle = ref('')
    const localChosenColor = ref<Color | null>()

    const setLocalTitle = (newTitle: string) => {
      localTitle.value = newTitle
      context.emit('update:title', newTitle)
    }

    const setLocalChosenColor = (newChosenColor: Color) => {
      localChosenColor.value = newChosenColor
      context.emit('update:chosenColor', newChosenColor)
    }

    const addNewList = () => {
      context.emit('addList')
    }

    watchEffect(() => {
      setShow(props.showPopUp)
    })

    watchEffect(() => {
      localTitle.value = props.title
    })

    watchEffect(() => {
      localChosenColor.value = props.chosenColor
    })

    return {
      show,
      setShowOn,
      setShowOff,
      localChosenColor,
      addNewList,
      localTitle,
      setLocalTitle,
      setLocalChosenColor,
    }
  },
  components: {
    AddList,
  },
})
</script>
<style lang="scss" scoped>
.add-list {
  &__btn {
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 12px;
    transition: 0.3s all;
    margin-top: 30px;
  }

  &__btn-text {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.15px;
    color: #767676;
    margin-left: 10px;

    &:hover {
      color: darken(#767676, 7%);
    }
  }
}
</style>
