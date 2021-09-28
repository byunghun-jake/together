<template>
  <router-link
    :to="{ name: 'ContentDetail', params: { contentId: content.id } }"
  >
    <div class="poster-wrapper">
      <img :src="content.posterPath" :alt="`${content.title}의 포스터`" />
    </div>
  </router-link>
</template>

<script lang="ts">
import { Content } from '@/libs/interface'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ContentPosterLink',
  props: {
    content: {
      type: Object as PropType<Content>,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.poster-wrapper {
  padding-top: 142.1686747%;
  @apply relative flex overflow-hidden rounded-md;

  img {
    @apply absolute inset-0 w-full;
  }
}
</style>
