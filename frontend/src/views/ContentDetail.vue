<template>
  <LoadingSection v-if="loading">로딩 중</LoadingSection>
  <template v-else>
    <section class="banner-section">
      <ContentDetailInfoSection
        v-if="!isMobile"
        :content="content"
        :contentType="contentType"
      />
      <div class="img-wrapper">
        <div class="layer"></div>
        <img :src="posterPath" alt="" />
      </div>
    </section>
    <div class="container py-4">
      <ContentDetailInfoSection
        v-if="isMobile"
        :content="content"
        :contentType="contentType"
      />
      <section class="youtube-section">
        <header class="section-header">{{ content.title }} 리뷰</header>
        <ul class="youtube-list">
          <li
            class="youtube-item"
            v-for="youtube in displayedReviews"
            :key="youtube.id.videoId"
          >
            <a
              :href="`https://youtube.com/watch?v=${youtube.id.videoId}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="youtube">
                <div class="thumbnail-wrapper">
                  <img
                    :src="youtube.snippet.thumbnails.high.url"
                    :alt="`${youtube.snippet.title} 썸네일`"
                  />
                </div>
                <span class="title" v-html="youtube.snippet.title" />
              </div>
            </a>
          </li>
        </ul>
      </section>
      <section class="party-section">
        <header class="section-header">
          <h3>파티에 참여하세요!</h3>
          <router-link class="more-link" :to="{ name: 'PartyList' }">
            <span class="label">더보기</span>
            <span class="material-icons">chevron_right</span>
          </router-link>
        </header>
        <ul class="party-list">
          <PartyListItem
            v-for="party in displayedParties"
            :key="party.id"
            :party="party"
          />
        </ul>
      </section>
      <section class="community-section">
        <header class="section-header">
          <h1>리뷰</h1>
          <p>{{ content.reviews.length }} 개</p>
        </header>
        <ul class="review-list">
          <li
            class="review-item"
            v-for="review in content.reviews"
            :key="review.id"
          >
            <div class="left">
              <img
                class="profile-img"
                src="https://cdn-icons-png.flaticon.com/512/1864/1864513.png"
              />
            </div>
            <div class="right">
              <div class="rating">{{ review.rating }}</div>
              <div class="upper">
                <span>{{ review.userId }}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </template>
</template>

<script lang="ts">
import axios from 'axios'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import ContentDetailInfoSection from '@/components/ContentDetailInfoSection.vue'
import PartyListItem from '@/components/PartyListItem.vue'
import LoadingSection from '@/components/Common/LoadingSection.vue'
import { useStore } from 'vuex'
import { Youtube, Comment, Content } from '@/libs/interfaces/content'
import { Party } from '@/libs/interfaces/party'

const YOUTUBE_BASEURL = 'https://www.googleapis.com/youtube/v3/search'
const YOUTUBE_KEY = 'AIzaSyA3BjU4BpGVhBFlvHsJHsTNRuLePCbaU1Q'

export default defineComponent({
  name: 'ContentDetail',
  props: {
    contentType: {
      type: String,
      required: true,
    },
    contentId: {
      type: [String, Number],
      required: true,
    },
  },
  components: { ContentDetailInfoSection, PartyListItem, LoadingSection },
  setup(props) {
    const store = useStore()
    const loading = ref<boolean>(true)
    const posterPath = ref<string>('')
    const content = ref<Content>()
    const youtubeReviews = ref<Youtube[]>()
    const parties = ref<Party[]>()
    const comments = ref<Comment[]>()
    const innerWidth = ref<number>(window.innerWidth)

    const isMobile = computed(() => {
      return innerWidth.value < 768
    })

    const displayedReviews = computed(() => {
      // 화면 사이즈에 따라 end index가 달라진다.
      return youtubeReviews.value?.slice(0, isMobile.value ? 3 : 6)
    })

    const displayedParties = computed(() => {
      return parties.value?.slice(0, Math.min(parties.value.length, 6))
    })

    const handleResize = (e: Event) => {
      const w = e.target as Window
      innerWidth.value = w.innerWidth
    }

    addEventListener('resize', handleResize)

    onMounted(async () => {
      try {
        content.value =
          props.contentType === 'movies'
            ? await store.dispatch('content/getMovie', props.contentId)
            : await store.dispatch('content/getProgram', props.contentId)

        posterPath.value = `https://image.tmdb.org/t/p/original${content.value?.posterPath}`
      } catch (error) {
        console.log(error)
        // 에러가 발생하는 경우 목록 페이지로 이동
      }

      try {
        parties.value = await store.dispatch('party/getParties')
      } catch (error) {
        console.log(error)
      }

      try {
        const res = await axios.get(`http://localhost:3000/comments`)
        comments.value = res.data
      } catch (error) {
        console.log(error)
      }

      let youtubeQuery = props.contentType === 'movies' ? '영화' : '드라마'
      try {
        const res = await axios.get(YOUTUBE_BASEURL, {
          params: {
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: `${youtubeQuery} ${content.value?.title} 리뷰`,
            maxResults: 20,
            type: 'video',
            regionCode: 'KR',
          },
        })
        youtubeReviews.value = res.data.items
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })
    onBeforeUnmount(() => {
      removeEventListener('resize', handleResize)
    })
    return {
      loading,
      isMobile,
      content,
      posterPath,
      displayedReviews,
      parties,
      displayedParties,
      comments,
    }
  },
})
</script>

<style lang="scss" scoped>
.banner-section {
  @apply relative grid place-items-center overflow-hidden md:grid-cols-2 h-44 md:h-80 bg-purple-600;

  .img-wrapper {
    @apply absolute top-0 left-0 w-full h-full z-0;

    .layer {
      @apply absolute top-0 left-0 w-full h-full z-10;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0.4)
      );
    }

    img {
      @apply absolute top-1/2 left-0 w-full;
      transform: translateY(-50%);
    }
  }
}

.youtube-section {
  @apply py-6 px-4;

  .section-header {
    @apply flex justify-between items-center text-2xl font-bold mb-6;
  }

  .youtube-list {
    @apply grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6;

    .youtube-item {
      .youtube {
        @apply grid grid-cols-2 md:grid-cols-1 gap-2 p-2;

        &:hover {
          @apply bg-gray-200;
        }

        .thumbnail-wrapper {
          padding-top: 55.5%;
          @apply relative overflow-hidden;

          img {
            transform: translateY(-50%);
            @apply absolute top-1/2 left-0 w-full object-center;
          }
        }
        .title {
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          @apply text-sm max-h-10 overflow-hidden overflow-ellipsis text-left;
        }
      }
    }
  }
}

.party-section {
  @apply py-6 px-4;

  .section-header {
    @apply flex items-center justify-between mb-6;

    h3 {
      @apply text-2xl font-bold;
    }

    .more-link {
      @apply flex items-center px-2;

      .label {
        @apply font-medium text-gray-700;
      }

      .material-icons {
        font-size: 1rem;
      }
    }
  }

  .party-list {
    @apply grid gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mb-1;
  }
}

.community-section {
  @apply py-6 px-4;

  .section-header {
    @apply flex items-center justify-between mb-6;

    h1 {
      @apply text-2xl font-bold;
    }

    p {
      @apply font-medium text-gray-700;
    }
  }

  .review-list {
    @apply flex gap-2 flex-wrap;

    .review-item {
      @apply flex gap-2 items-center p-2 cursor-pointer;

      &:hover {
        @apply bg-yellow-50;
      }

      .left {
        @apply flex flex-col gap-1;

        .profile-img {
          @apply w-8 h-8 rounded-md;
        }
      }

      .upper {
        @apply mb-1 flex gap-2 text-xs text-gray-400;

        .rating {
          @apply text-center bg-gray-900 rounded-md text-xs text-yellow-400;
        }
      }

      .review {
        @apply text-sm mb-2;
      }
    }
  }
}
</style>
