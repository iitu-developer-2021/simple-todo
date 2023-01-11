<template>
  <component
    :is="tag"
    class="badge"
    :style="taskColorStyle"
    :class="{ 'badge--active': isActive }"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '10px',
    },
    isCursorPointer: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const taskColorStyle = {
      background: props.color,
      width: props.size,
      height: props.size,
      cursor: props.isCursorPointer ? 'pointer' : 'auto',
    }
    return {
      taskColorStyle,
    }
  },
})
</script>
<style lang="scss" scoped>
.badge {
  border-radius: 20px;

  &--active {
    border: 2px solid #525252;
  }
}
</style>
