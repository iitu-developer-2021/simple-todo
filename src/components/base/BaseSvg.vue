<template>
  <SvgSprite :symbol="icon" :size="size" :ref="setSvgRef" class="sprite-icon"></SvgSprite>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
// @ts-ignore
import CssFilterConverter from 'css-filter-converter'
import { SvgSprite } from 'vue-svg-sprite'
const { hexToFilter } = CssFilterConverter

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
      default: '',
    },
    hoverColor: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    type SvgComponent = InstanceType<typeof SvgSprite>
    const svgRef = ref<SvgComponent>()
    const setSvgRef = (newSvgRef: SvgComponent) => (svgRef.value = newSvgRef)

    const color = computed(() => {
      if (!props.color) return ''
      return hexToFilter(props.color)
    })

    watchEffect(() => {
      if (svgRef.value?.$el) {
        svgRef.value.$el.style.filter = color.value.color
      }
    })

    const hoverColor = computed(() => {
      if (!props.hoverColor) return ''
      return hexToFilter(props.hoverColor)
    })

    const onMouseOver = () => {
      if (svgRef.value?.$el) {
        svgRef.value.$el.style.filter = hoverColor.value.color
      }
    }

    const onMouseOut = () => {
      if (svgRef.value?.$el) {
        svgRef.value.$el.style.filter = color.value.color
      }
    }

    onMounted(() => {
      if (props.hoverColor) {
        svgRef.value?.$el.addEventListener('mouseover', onMouseOver)
        svgRef.value?.$el.addEventListener('mouseout', onMouseOut)
      }
    })

    onUnmounted(() => {
      if (props.hoverColor) {
        svgRef.value?.$el.removeEventListener('mouseover', onMouseOut)
        svgRef.value?.$el.removeEventListener('mouseout', onMouseOut)
      }
    })

    return { svgRef, setSvgRef }
  },
  components: { SvgSprite },
})
</script>
<style lang="scss" scoped>
.sprite-icon {
  transition: 0.3s all;
}
</style>
