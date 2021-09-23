<template>
  <section class="banner-section">배너</section>
  <div class="container">
    <section class="filter-section">
      <ul class="filter-list">
        <li class="filter-item">넷</li>
        <li class="filter-item">웨</li>
        <li class="filter-item">왓</li>
        <li class="filter-item">네</li>
      </ul>
    </section>
    <section class="contents-section">
      <header class="section-header">추천 컨텐츠</header>
      <ul class="contents-list">
        <li class="contents-item" v-for="content in contents" :key="content.id">
          <router-link
            :to="{ name: 'ContentDetail', params: { contentId: content.id } }"
          >
            <div class="poster-wrapper">
              <img
                :src="content.posterPath"
                :alt="`${content.title}의 포스터`"
              />
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

interface Content {
  id: number
  title: string
  posterPath: string
}

export default defineComponent({
  name: 'ContentList',
  setup() {
    const store = useStore()
    const contents = ref<Content[]>()

    onMounted(async () => {
      // Axios 에러인 상황과 알 수 없는 에러인 상황을 함께 다루려면?
      // 에러를 핸들링하는 부분이 컴포넌트쪽으로 올 필요가 있을까?
      try {
        const res: Content[] = await store.dispatch(
          'content/getRecommendContent'
        )
        contents.value = res
      } catch (error) {
        alert(error)
      }
    })
    return {
      contents,
    }
  },
})
</script>

<style lang="scss" scoped>
.banner-section {
  @apply h-44 md:h-80 bg-gray-200;
}
.filter-section {
  @apply py-6 px-4;

  .filter-list {
    @apply flex gap-6;

    .filter-item {
      @apply w-8 h-8 md:w-10 md:h-10 bg-pink-300;
    }
  }
}

.contents-section {
  @apply p-4;

  .section-header {
    @apply text-2xl font-bold mb-4;
  }

  .contents-list {
    @apply grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2;

    .poster-wrapper {
      padding-top: 142.1686747%;
      @apply relative flex overflow-hidden rounded-md;

      img {
        @apply absolute inset-0 w-full;
      }
    }
  }
}
</style>
