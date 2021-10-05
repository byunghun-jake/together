<template>
  <LoadingSection v-if="loading">로딩 중</LoadingSection>
  <template v-else>
    <section class="banner-section">
      <ContentDetailInfoSection v-if="!isMobile" :content="content" />
      <div class="img-wrapper">
        <div class="layer"></div>
        <img :src="posterPath" alt="" />
      </div>
    </section>
    <div class="container py-4">
      <ContentDetailInfoSection v-if="isMobile" :content="content" />
      <section class="review-section">
        <header class="section-header">{{ content.title }} 리뷰</header>
        <ul class="review-list">
          <li
            class="review-item"
            v-for="review in displayedReviews"
            :key="review.id.videoId"
          >
            <a
              :href="`https://youtube.com/watch?v=${review.id.videoId}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="review">
                <div class="thumbnail-wrapper">
                  <img
                    :src="review.snippet.thumbnails.high.url"
                    :alt="`${review.snippet.title} 썸네일`"
                  />
                </div>
                <span class="title" v-html="review.snippet.title" />
              </div>
            </a>
          </li>
        </ul>
      </section>
      <section class="party-section">
        <header class="section-header">
          <h3>파티에 참여하세요!</h3>
          <router-link class="more-link" :to="{ name: 'ContentList' }">
            <span class="label">더보기</span>
            <span class="material-icons">chevron_right</span>
          </router-link>
        </header>
        <ul class="party-list">
          <PartyListItem
            v-for="party in parties"
            :key="party.id"
            :party="party"
          />
        </ul>
      </section>
      <section class="community-section">
        <header class="section-header">
          <h1>커뮤니티</h1>
          <p>댓글 12</p>
        </header>
        <ul class="comment-list">
          <li
            class="comment-item"
            v-for="comment in comments"
            :key="comment.id"
          >
            <div class="left">
              <img class="profile-img" :src="comment.user.profileImg" />
              <div class="rating">{{ comment.rating }}</div>
            </div>
            <div class="right">
              <div class="upper">
                <span>{{ comment.user.nickName }}</span>
                <span>2시간 전</span>
              </div>
              <div class="comment">종이로 집을 지으면 전부 타버릴거야!</div>
              <button class="btn-like">
                <span class="material-icons text-gray-400">favorite</span>
                <span class="like-count">{{ comment.like }}</span>
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </template>
  <div class="py-40"></div>
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
      return youtubeReviews.value?.slice(0, isMobile.value ? 3 : 12)
    })

    addEventListener('resize', (e) => {
      const w = e.target as Window
      innerWidth.value = w.innerWidth
    })

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

      try {
        const res = await axios.get(YOUTUBE_BASEURL, {
          params: {
            key: YOUTUBE_KEY,
            part: 'snippet',
            q: `${content.value?.title} 리뷰`,
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
      removeEventListener('resize', () => {
        console.log('Remove')
      })
    })
    return {
      loading,
      isMobile,
      content,
      posterPath,
      displayedReviews,
      parties,
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

.review-section {
  @apply py-6 px-4;

  .section-header {
    @apply flex justify-between items-center text-2xl font-bold mb-6;
  }

  .review-list {
    @apply grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6;

    .review-item {
      .review {
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
        @apply text-sm font-medium text-gray-500;
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
      @apply text-sm font-medium text-gray-400;
    }
  }

  .comment-list {
    @apply grid gap-2;

    .comment-item {
      @apply flex gap-2 p-2;

      .left {
        @apply flex flex-col gap-1;

        .profile-img {
          @apply w-8 h-8 rounded-md;
        }

        .rating {
          @apply text-center bg-gray-900 rounded-md text-xs text-yellow-400;
        }
      }

      .right {
        .upper {
          @apply mb-1 flex gap-2 text-xs text-gray-400;
        }

        .comment {
          @apply text-sm mb-2;
        }
        .btn-like {
          @apply flex items-center gap-2;

          .material-icons {
            font-size: 1rem;
            @apply text-gray-400;
          }

          .like-count {
            @apply text-xs text-gray-400;
          }
        }
      }
    }
  }
}
</style>
