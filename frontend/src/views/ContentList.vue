<template>
  <section class="banner-section">배너</section>
  <div class="container">
    <section class="filter-section">
      <div class="filter-list">
        <button
          class="filter-button img-wrapper"
          :class="{ active: provider.active }"
          v-for="(provider, key) in providers"
          :key="key"
          @click="handleFilterClick(provider.name)"
        >
          <img
            :src="require(`@/assets/images/${provider.name}.png`)"
            :alt="provider.name"
          />
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
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Content } from '@/libs/interface'
import ContentPosterLink from '@/components/ContentPosterLink.vue'

type Provider = 'netflix' | 'wavve' | 'watcha'

interface Providers {
  [key: string]: {
    name: Provider
    active: boolean
  }
}

export default defineComponent({
  name: 'ContentList',
  components: { ContentPosterLink },
  setup() {
    const store = useStore()
    const contents = ref<Content[]>([])

    const providers = ref<Providers>({
      netflix: {
        name: 'netflix',
        active: true,
      },
      wavve: {
        name: 'wavve',
        active: true,
      },
      watcha: {
        name: 'watcha',
        active: true,
      },
    })

    const displayedContentList = computed(() => {
      return contents.value.filter((content) => {
        return content.providers.some(
          (provider) => providers.value[provider].active
        )
      })
    })

    const handleFilterClick = (providerName: Provider) => {
      providers.value[providerName].active =
        !providers.value[providerName].active
    }

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
    @apply flex gap-6;

    .filter-button {
      @apply w-8 h-8 md:w-10 md:h-10 opacity-30;

      &.active {
        @apply opacity-100;
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
