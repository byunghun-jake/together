<template>
  <div class="container grid gap-6 max-w-xl">
    <section class="noti-section">
      <div class="noti-box">
        <p>좋아하는 장르를 선택하면,</p>
        <p>콘텐츠를 추천해 드릴게요 🎉</p>
      </div>
    </section>
    <LoadingSection v-if="loading" />
    <template v-else>
      <section class="genre-section">
        <div class="genre-wrapper">
          <transition-group name="genres">
            <button
              class="genre-button active"
              v-for="genre in favGenreList"
              :key="genre.id"
              @click="handleRemoveFromFavGenreList(genre)"
            >
              {{ genre.kName }}
            </button>
            <button
              class="genre-button"
              v-for="genre in genreList"
              :key="genre.id"
              @click="handleAddToFavGenreList(genre)"
            >
              {{ genre.kName }}
            </button>
          </transition-group>
        </div>
      </section>
      <SubmitButton label="저장하기" @click="handleClick" />
    </template>
  </div>
</template>

<script lang="ts">
import { Genre } from '@/libs/interface'
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import LoadingSection from '@/components/Common/LoadingSection.vue'
import SubmitButton from '@/components/Common/SubmitButton.vue'

export default defineComponent({
  name: 'ProfileGenre',
  components: { LoadingSection, SubmitButton },
  setup() {
    const store = useStore()
    const loading = ref<boolean>(true)
    const favGenreList = ref<Genre[]>([])
    const genreList = ref<Genre[]>([])

    const handleAddToFavGenreList = (selectedGenre: Genre) => {
      genreList.value = genreList.value.filter(
        (genre) => genre.id !== selectedGenre.id
      )
      favGenreList.value.push(selectedGenre)
    }

    const handleRemoveFromFavGenreList = (selectedGenre: Genre) => {
      favGenreList.value = favGenreList.value.filter(
        (genre) => genre.id !== selectedGenre.id
      )
      genreList.value.push(selectedGenre)
    }

    const handleClick = () => {
      if (confirm('선호 장르를 저장하시겠습니까?')) {
        console.log(favGenreList.value)
      }
    }

    onMounted(async () => {
      try {
        genreList.value = await store.dispatch('content/getGenreList')
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })
    return {
      loading,
      favGenreList,
      genreList,
      handleClick,
      handleAddToFavGenreList,
      handleRemoveFromFavGenreList,
    }
  },
})
</script>

<style lang="scss" scoped>
.noti-section {
  @apply py-6 px-4;

  .noti-box {
    @apply w-full py-4 text-center bg-indigo-50 rounded-lg;

    p {
      @apply text-lg font-bold text-indigo-500;
    }
  }
}

.genre-section {
  @apply p-4;

  .genre-wrapper {
    @apply flex flex-wrap gap-4;

    .genre-button {
      @apply py-2 px-4 bg-gray-100 text-gray-600 font-bold rounded-md;

      &.active {
        @apply bg-indigo-50 text-indigo-900;
      }
    }
  }
}

.genres-move {
  @apply transition-all;
}
</style>
