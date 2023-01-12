<template>
  <div>
    <ul class="list">
      <ListItem text="Все задачи" to="/" class="list__all">
        <BaseSvg icon="list" size="15" class="list__icon" />
      </ListItem>
    </ul>
    <ul class="list list-items">
      <ListItem
        v-for="listItem in list"
        :text="listItem.name"
        :key="listItem.id"
        :to="'/' + listItem.id"
        :color="listItem.color.hex"
        class="list__item"
        @deleteTask="$emit('deleteTask', listItem.id)"
        deletable
      />
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ListItem from './ListItem.vue'
import type { PropType } from 'vue'
import type { List } from '@/types'

export default defineComponent({
  props: {
    list: {
      type: [] as PropType<List[]>,
      default: () => [],
    },
  },
  emits: ['deleteTask'],
  components: {
    ListItem,
  },
})
</script>
<style lang="scss" scoped>
.list {
  list-style: none;

  &__all {
    font-size: 16px;
    margin-bottom: 15px;
  }

  &__item {
    font-size: 15px;
    margin-bottom: 2px;
  }

  &__icon {
    margin-right: 16px;
  }
}

.list-items {
  max-height: 330px;
  overflow-y: auto;
}
</style>
