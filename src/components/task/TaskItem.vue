<template>
  <div class="task-item">
    <div class="task-item__header">
      <span class="task-item__text" :style="{ color: title.color }">{{ title.name }}</span>
      <BaseSvg icon="pencil" class="task-item__icon" @click="$emit('editTitle')" size="16" />
    </div>
    <span class="task-item__divider"></span>
    <div class="task-item__children">
      <slot :children="children"></slot>
    </div>
    <AddTask />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Task } from '@/types'
import AddTask from '@/components/add-task/AddTask.vue'

interface Title {
  name: string
  color: string
}

export default defineComponent({
  props: {
    title: {
      type: Object as PropType<Title>,
      default: () => ({
        name: '',
        color: '',
      }),
    },
    children: {
      type: Array as PropType<Task[]>,
      default: () => [],
    },
  },
  emits: ['editTitle', 'updateCheck'],
  components: {
    AddTask,
  },
})
</script>
<style lang="scss" scoped>
.task-item {
  $self: &;

  &:not(:first-child) &__header {
    margin-top: 30px;
  }

  &__header {
    display: flex;
    align-items: center;

    &:hover > #{$self}__icon {
      display: block;
    }
  }

  &__text {
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    margin-right: 14px;
    cursor: default;
  }

  &__icon {
    cursor: pointer;
    display: none;
  }

  &__divider {
    display: block;
    width: 100%;
    background: #f2f2f2;
    height: 1px;
    margin: 20px 0;
  }
}
</style>
