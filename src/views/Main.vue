<template>
  <div class="app">
    <div class="app__wrapper">
      <div class="app__content">
        <aside class="app__aside">
          <List :list="list" @deleteTask="deleteListItem" />
          <AddList
            :colors="colors"
            @addList="addListItem"
            :loading="addListItemLoading"
            :show-pop-up="showPopUp"
            v-model:title="title"
            v-model:chosen-color="chosenColor"
          />
        </aside>
        <main class="app__main">
          <TaskItem
            v-for="listItem in tasks"
            :key="listItem.id"
            :title="{ name: listItem.name, color: listItem.color.hex }"
            :children="listItem.tasks"
            @editTitle="editListTitle(listItem.id)"
            @updateCheck="updateTaskCompleted"
          >
            <template #default="{ children }">
              <TaskChild
                v-for="child in children"
                :key="child.id"
                :field-id="child.id.toString()"
                :label="child.text"
                :checked="child.completed"
                class="task-child"
                @update:checked="changeCompletedStatus(child.id)"
                @editTask="updateTask(listItem.id, child.id)"
                @deleteTask="deleteTask(listItem.id, child.id)"
              />
              <AddTask
                :can-add="!!$route.params.id"
                v-model="addTaskInputValue"
                v-model:show-add-task-fields="addTaskFieldShow"
                :add-task-loading="addTaskLoading"
                @addTaskItem="addTask(listItem.id)"
                class="add-task"
              />
            </template>
          </TaskItem>
        </main>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import List from '@/components/list/List.vue'
import AddList from '@/components/add-list/AddList.vue'
import TaskItem from '@/components/task/TaskItem.vue'
import TaskChild from '@/components/task/TaskChild.vue'
import AddTask from '@/components/add-task/AddTask.vue'

import { defineComponent } from 'vue'
import { useColor } from '@/views/composables/useColor'
import { useList } from '@/views/composables/useList'
import { useTask } from '@/views/composables/useTask'
import { useOutsideClick } from '@/composables/useOutsideClick'

export default defineComponent({
  async setup() {
    const {
      fetchList,
      addListItem,
      deleteListItem,
      addListItemLoading,
      title,
      list,
      showPopUp,
      chosenColor,
    } = useList()

    const { colors, fetchColors } = useColor()

    const {
      tasks,
      editListTitle,
      changeCompletedStatus,
      addTask,
      addTaskLoading,
      addTaskInputValue,
      addTaskFieldShow,
      deleteTask,
      updateTask,
    } = useTask()

    await fetchList()
    await fetchColors()

    return {
      addListItem,
      deleteListItem,
      addListItemLoading,
      title,
      list,
      showPopUp,
      chosenColor,

      colors,

      tasks,
      editListTitle,
      changeCompletedStatus,
      addTask,
      addTaskLoading,
      addTaskInputValue,
      addTaskFieldShow,
      deleteTask,
      updateTask,
    }
  },
  components: {
    List,
    AddList,
    TaskItem,
    TaskChild,
    AddTask,
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

.add-task {
  margin-top: 10px;
}
</style>
