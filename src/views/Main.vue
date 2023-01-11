<template>
  <div class="app">
    <div class="app__wrapper">
      <div class="app__content">
        <aside class="app__aside">
          <List :list="list" @deleteTask="deleteListItem" />
          <AddList
            :colors="colors"
            @addList="onAddList"
            :loading="addListItemLoading"
            :show-pop-up="showPopUp"
            v-model:title="title"
            v-model:chosen-color="chosenColor"
          />
        </aside>
        <main class="app__main">
          <TaskItem
            v-for="listItem in getList"
            :key="listItem.id"
            :title="{ name: listItem.name, color: listItem.color.hex }"
          />
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import List from '@/components/list/List.vue'
import AddList from '@/components/add-list/AddList.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import { defineComponent, ref } from 'vue'
import { useListStore } from '@/store/useList'
import { useColorStore } from '@/store/useColor'
import { storeToRefs } from 'pinia'
import type { List as ListType } from '@/types'
import type { Color } from '@/types'

export default defineComponent({
  async setup() {
    const listStore = useListStore()
    const { fetchList, deleteListItem, addListItem } = listStore
    const { list, addListItemLoading, getList } = storeToRefs(listStore)

    await fetchList()

    const colorStore = useColorStore()
    const { fetchColors } = colorStore
    const { colors } = storeToRefs(colorStore)
    await fetchColors()

    const title = ref('')
    const chosenColor = ref<Color>({
      id: 0,
      name: '',
      hex: '',
    })
    const showPopUp = ref(false)

    const onAddList = async () => {
      const getList = (color: Color, title: string): ListType => ({
        id: Math.ceil(Math.random() * 10000000) + 1,
        name: title,
        color: Object.assign({}, color) as Color,
        colorId: color?.id as number,
        tasks: [],
      })

      addListItem(getList(chosenColor.value as Color, title.value)).then(() => {
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
      list,
      colors,
      deleteListItem,
      onAddList,
      addListItemLoading,
      showPopUp,
      title,
      chosenColor,
      getList,
    }
  },
  components: {
    List,
    AddList,
    TaskItem,
  },
})
</script>
<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-items: center;
  align-items: center;

  &__wrapper {
    max-width: 1040px;
    width: 100%;
    margin: 0 auto;
    border-radius: 5px;
    padding: 0 20px;
  }

  &__content {
    display: flex;
    height: 600px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  }

  &__aside {
    width: 250px;
    padding: 56px 20px;
    background: #f4f6f8;
  }

  &__main {
    flex: 1;
    padding: 56px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
