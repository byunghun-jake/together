<template>
  <section class="banner-section">배너</section>
  <div class="container">
    <LoadingSection v-if="loading" />
    <template v-else>
      <section class="filter-section">
        <div class="filter-list">
          <button
            class="filter-button"
            :class="{ active: provider.active }"
            v-for="(provider, index) in providers"
            :key="provider.name"
            @click="handleFilterClick(index)"
          >
            {{ provider.name }}
            <!-- <img
              :src="require(`@/assets/images/logo/${provider.name}.png`)"
              :alt="provider.name"
            /> -->
          </button>
        </div>
      </section>
      <section class="contents-section">
        <header class="section-header">추천 컨텐츠</header>
        <ul class="contents-list">
          <transition-group name="contents">
            <li
              class="contents-item"
              v-for="content in displayedContentList"
              :key="content.id"
            >
              <ContentPosterLink :content="content" />
            </li>
          </transition-group>
        </ul>
      </section>
    </template>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { ProviderFilter, ProviderNameEn } from '@/libs/interfaces/content'
import ContentPosterLink from '@/components/ContentPosterLink.vue'
import LoadingSection from '@/components/Common/LoadingSection.vue'
import { Movie } from '@/libs/interfaces/content'

export default defineComponent({
  name: 'ContentList',
  components: { ContentPosterLink, LoadingSection },
  setup() {
    const store = useStore()
    const loading = ref<boolean>(true)
    const contents = ref<Movie[]>([])

    const providers = ref<ProviderFilter>([
      { name: 'Netflix', active: true },
      { name: 'Watcha', active: true },
      { name: 'Naver Store', active: true },
      { name: 'wavve', active: true },
      { name: 'Crunchyroll', active: true },
      { name: 'Curiosity Stream', active: true },
      { name: 'Hoichoi', active: true },
      { name: 'Classix', active: true },
      { name: 'BroadwayHD', active: true },
      { name: 'Magellan TV', active: true },
      { name: 'WOW Presents Plus', active: true },
      { name: 'Amazon Prime Video', active: true },
    ])

    const activeProviders = computed(() => {
      const res: ProviderNameEn[] = []
      providers.value.forEach((p) => {
        if (p.active) {
          res.push(p.name)
        }
      })
      return res
    })

    const displayedContentList = computed(() => {
      return contents.value.filter((content) => {
        return content.providers.some((p) =>
          activeProviders.value.includes(p.name)
        )
      })
    })

    const handleFilterClick = (index: number) => {
      if (providers.value.every((p) => p.active)) {
        providers.value.forEach((p, i) => {
          p.active = i === index ? true : false
        })
      } else {
        providers.value[index].active = !providers.value[index].active
        if (providers.value.every((p) => p.active === false)) {
          console.log('hh')
          providers.value.forEach((p) => (p.active = true))
        }
      }
    }

    onMounted(async () => {
      // TODO
      // Axios 에러인 상황과 알 수 없는 에러인 상황을 함께 다루려면?
      // 에러를 핸들링하는 부분이 컴포넌트쪽으로 올 필요가 있을까?
      try {
        contents.value = await store.dispatch('content/getRecommendContent')
        loading.value = false
      } catch (error) {
        alert(error)
      }
    })
    return {
      loading,
      contents,
      displayedContentList,
      providers,
      handleFilterClick,
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
    @apply flex flex-wrap gap-2;

    .filter-button {
      @apply py-2 px-4 rounded transition-colors;
      /* @apply w-8 h-8 md:w-10 md:h-10 opacity-30; */

      &:hover {
        @apply bg-indigo-200;
      }

      &.active {
        @apply bg-indigo-100;
        /* @apply opacity-100; */

        &:hover {
          @apply bg-indigo-300;
        }
      }

      img {
        @apply object-contain object-center;
      }
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

/* Transition */
.contents-move {
  @apply transition-all;
}
</style>
