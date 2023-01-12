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
      <div class="task-child__checkbox">
        <BaseSvg :icon="checkboxIcon" size="25" />
      </div>
      <span class="task-child__text">{{ label }}</span>
      <span class="task-child__actions">
        <BaseSvg icon="pencil" size="15" class="task-child__pencil" />
        <BaseSvg icon="only-close" size="15" class="task-child__close" />
      </span>
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
  padding: 10px 10px;
  border-radius: 10px;
  transition: 0.3s all;
  $self: &;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  }

  &__input {
    display: none;
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-right: 60px;
    position: relative;

    &:hover #{$self}__actions {
      display: block;
    }
  }

  &__text {
    margin-left: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 19px;
    color: #000000;
  }

  &__actions {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
    display: none;
  }

  &__pencil {
    margin-right: 15px;
  }

  &__pencil,
  &__close {
    &:hover {
      transform: scale(1.4);
    }
  }
}
</style>
