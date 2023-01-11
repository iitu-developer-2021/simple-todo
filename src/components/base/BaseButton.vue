<template>
  <component :is="tag" class="button" v-bind="$attrs" :class="btnClasses" :style="btnStyles">
    <slot v-if="!loading" />
    <BaseLoader v-else width="30px" height="30px" inner />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'BaseButton.vue',
  inheritAttrs: false,
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    height: {
      type: String,
      default: '40px',
    },
    width: {
      type: String,
      default: '100%',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    buttonType: {
      type: String as PropType<'green' | 'gray'>,
      default: 'green',
      validators: (value: string) => {
        return ['green', 'gray'].includes(value)
      },
    },
  },
  computed: {
    btnClasses() {
      const classes = []
      if (this.buttonType === 'green') classes.push('button--green')
      if (this.buttonType === 'gray') classes.push('button--gray')
      if (this.loading) classes.push('button--loading')
      return classes
    },
    btnStyles() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.button {
  outline: none;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: 0.15px;
  padding: 7px 10px;
  border: none;
  cursor: pointer;
  transition: 0.3s all;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &--green {
    background: #4dd599;
    color: #ffffff;

    &:hover {
      background: lighten(#4dd599, 3%);
    }

    &:disabled {
      background: lighten(#4dd599, 9%);
      cursor: not-allowed;
    }
  }

  &--gray {
    background: #f4f6f8;
    color: #9c9c9c;

    &:hover {
      background: darken(#f4f6f8, 3%);
    }

    &:disabled {
      background: lighten(#f4f6f8, 5%);
      cursor: not-allowed;
    }
  }

  &--loading {
    cursor: none;
    pointer-events: none;
  }
}
</style>
