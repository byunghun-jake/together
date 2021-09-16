<template>
  <Header />
  <router-view />
  <BottomNav />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Common/Header.vue'
import BottomNav from '@/components/Common/BottomNav.vue'

export default defineComponent({
  components: { Header, BottomNav },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
#app {
  @apply min-h-screen;
}
</style>
