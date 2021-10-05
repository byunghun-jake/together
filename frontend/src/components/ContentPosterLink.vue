<template>
  <router-link
    :to="{
      name: 'ContentDetail',
      params: { contentId: content.id, contentType },
    }"
  >
    <div class="poster-wrapper">
      <img :src="posterPath" :alt="`${content.originalTitle}의 포스터`" />
    </div>
  </router-link>
</template>

<script lang="ts">
import { Content } from '@/libs/interfaces/content'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ContentPosterLink',
  props: {
    content: {
      type: Object as PropType<Content>,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const posterPath = `https://image.tmdb.org/t/p/w500${props.content.posterPath}`
    return { posterPath }
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
