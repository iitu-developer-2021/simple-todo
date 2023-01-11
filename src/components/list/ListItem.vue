<template>
  <component :is="tag" class="list-item">
    <router-link
      :to="to"
      class="list-item__link"
      :class="{ 'list-item__link--deletable': deletable }"
      exact-active-class="list-item__link--active"
    >
      <div class="list-item__wrapper">
        <div class="list-item__left">
          <slot>
            <Badge :color="color" size="10px" class="list-item__badge" />
          </slot>
        </div>
        <p class="list-item__right">{{ text }}</p>
      </div>
      <button class="list-item__delete" @click.prevent="$emit('deleteTask')">
        <BaseSvg icon="only-close" size="12" />
      </button>
    </router-link>
  </component>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Badge from '../badge/Badge.vue'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'li',
    },
    color: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    deletable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Badge,
  },
})
</script>
<style lang="scss" scoped>
.list-item {
  height: 40px;
  $self: &;

  &__link {
    text-decoration: none;
    border-radius: 4px;
    padding: 12px 12px;
    transition: 0.3s all;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    &:hover,
    &--active {
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    &--deletable:hover > #{$self}__delete {
      display: block;
    }
  }

  &__delete {
    border: 0;
    outline: 0;
    background: transparent;
    position: absolute;
    right: 15px;
    top: 50%;
    cursor: pointer;
    width: 12px;
    height: 12px;
    transform: translateY(-50%);
    display: none;
    transition: 0.3s all;

    &:hover {
      transform: translateY(-50%) scale(1.4);
    }
  }

  &__wrapper {
    display: flex;
  }

  &__left {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__right {
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;
    color: #000;
    width: 80%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &__badge {
    margin-right: 20px;
  }
}
</style>
