<template>
  <div class="task-child">
    <input
      @input="(event) => $emit('update:checked', event.target.checked)"
      type="checkbox"
      :checked="checked"
      :id="fieldId"
      class="task-child__input"
    />
    <label :for="fieldId" class="task-child__label">
      <BaseSvg :icon="checkboxIcon" size="25" />
      <span class="task-child__text">{{ label }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    fieldId: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
    },
  },
  emits: ['update:checked'],
  computed: {
    checkboxIcon() {
      return this.checked ? 'checkbox-done' : 'checkbox-initial'
    },
  },
}
</script>

<style lang="scss">
.task-child {
  &__input {
    display: none;
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__text {
    margin-left: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 19px;
    color: #000000;
  }
}
</style>
