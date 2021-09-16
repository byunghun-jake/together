<template>
  <section class="info-section">
    <header class="section-header">
      <span class="title">{{ content.title }}</span>
      <div class="sim-rate">{{ content.simRate }}%</div>
    </header>
    <ul class="provider-list">
      <li
        class="provider-item"
        v-for="provider in content.providers"
        :key="provider"
      >
        {{ provider }}
      </li>
    </ul>
    <div class="details">
      <div>{{ content.firstAirYear }}</div>
      <div>{{ content.rated }}</div>
      <div>시즌 {{ content.seasons }}개</div>
    </div>
    <div class="overview">
      {{ content.overview }}
    </div>
    <div class="rating-wrapper">
      <button class="rating-btn" v-for="i in 5" :key="i">
        <span class="material-icons star">star</span>
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Content = {
  id: number
  title: string
  posterPath: string
  simRate: number
  providers: string[]
  firstAirYear: number
  rated: string
  seasons: number
  overview: string
}

export default defineComponent({
  name: 'ContentDetailInfoSection',
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
.info-section {
  @apply p-4 grid gap-4;

  .section-header {
    @apply flex justify-between items-center;

    .title {
      @apply text-2xl font-bold;
    }

    .sim-rate {
      @apply text-xs text-yellow-400 bg-gray-900 rounded-md py-0.5 px-2;
    }
  }

  .provider-list {
    @apply flex gap-2;
  }

  .details {
    @apply flex gap-2 text-sm;
  }

  .overview {
    word-break: keep-all;
    @apply text-sm;
  }

  .rating-wrapper {
    @apply p-2 border border-gray-200 rounded mr-auto flex gap-1;

    .rating-btn {
      @apply flex;

      .star {
        @apply text-gray-200;
      }
    }
  }
}
</style>
