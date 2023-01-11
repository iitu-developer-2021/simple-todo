<template>
  <div class="task-panel">
    <BaseInput
      :value="modelValue"
      @input="onUpdateModelValue($event.target.value)"
      placeholder="Название папки"
      class="task-panel__input"
    />

    <BaseSvg icon="close" class="task-panel__close" @click="$emit('closeAddPanel')" />

    <div class="task-panel__colors">
      <Badge
        v-for="color in colors"
        :key="color.id"
        :color="color.hex"
        size="20px"
        :is-active="localChosenColor.hex === color.hex"
        @click="onUpdateCloseValue(color)"
        is-cursor-pointer
      />
    </div>

    <BaseButton
      @click="$emit('addList')"
      :disabled="!localChosenColor.id || !modelValue"
      :loading="addTaskLoading"
    >
      Добавить
    </BaseButton>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watchEffect } from 'vue'
import Badge from '@/components/badge/Badge.vue'
import type { Color } from '@/types'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    chosenColor: {
      type: Object as PropType<Color>,
      default: () => ({
        id: '',
        name: '',
        hex: '',
      }),
    },
    addTaskLoading: {
      type: Boolean,
      default: false,
    },
    colors: {
      type: Array as PropType<Color[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'update:chosenColor', 'closeAddPanel'],
  setup(props, context) {
    const localChosenColor = ref<Color>(props.chosenColor)
    const localModelValue = ref('')

    const onUpdateModelValue = (value: string) => {
      localModelValue.value = value
      context.emit('update:modelValue', value)
    }

    const onUpdateCloseValue = (value: Color) => {
      localChosenColor.value = value
      context.emit('update:chosenColor', value)
    }

    watchEffect(() => {
      localChosenColor.value = props.chosenColor
    })

    watchEffect(() => {
      localModelValue.value = props.modelValue
    })

    return {
      localChosenColor,
      localModelValue,
      onUpdateModelValue,
      onUpdateCloseValue,
    }
  },
  components: {
    Badge,
  },
})
</script>
<style lang="scss" scoped>
.task-panel {
  background: #fff;
  padding: 18px;
  width: 260px;
  position: relative;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  &__close {
    position: absolute;
    top: -8px;
    right: -8px;
    cursor: pointer;
    width: 25px;
    height: 25px;
  }

  &__colors {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
  }
}
</style>
