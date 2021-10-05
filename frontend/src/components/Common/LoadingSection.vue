<template>
  <section>
    <p>로딩 중입니다!</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoadingSection',
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
section p {
  @apply text-2xl font-bold text-red-600;
}
</style>
