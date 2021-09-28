<template>
  <section v-if="loading">로딩 중</section>
  <template v-else>
    <div class="container max-w-screen-md">
      <section class="profile-main__info__section">
        <div class="profile-main__info__top--array">
          <div class="text-2xl font-bold">내 정보</div>
          <div class="text-gray-400">
            <router-link :to="{ name: 'ProfileEdit' }">수정</router-link>
          </div>
        </div>
        <div class="profile-main__info--array">
          <p class="text-gray-500">닉네임</p>
          <p>{{ account.nickName }}</p>
        </div>
        <div class="profile-main__info--array">
          <p class="text-gray-500">이름</p>
          <p>{{ account.name }}</p>
        </div>
        <div class="profile-main__info--array">
          <p class="text-gray-500">휴대폰 번호</p>
          <p>{{ account.phoneNumber }}</p>
        </div>
      </section>
      <section class="profile-main__seen__section">
        <header>
          <h3>내가 본 컨텐츠</h3>
          <router-link class="flex" to="/">
            <span class="material-icons">chevron_right</span>
          </router-link>
        </header>
        <ul class="contents-list">
          <li
            class="contents-list-item"
            v-for="content in contents"
            :key="content.id"
          >
            <ContentPosterLink :content="content" />
          </li>
        </ul>
      </section>
      <section class="profile-main__rating__section">
        <header>
          <h3>내가 평가한 콘텐츠</h3>
          <router-link class="flex" to="/">
            <span class="material-icons">chevron_right</span>
          </router-link>
        </header>
        <ul class="contents-list">
          <li
            class="contents-list-item"
            v-for="content in contents"
            :key="content.id"
          >
            <ContentPosterLink :content="content" />
          </li>
        </ul>
      </section>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'
import { Content } from '@/libs/interface'
import ContentPosterLink from '@/components/ContentPosterLink.vue'
import { useRouter } from 'vue-router'

interface Account {
  id: number
  name: string
  nickName: string
  phoneNumber: string
}

export default defineComponent({
  name: 'ProfileMain',
  components: {
    ContentPosterLink,
  },
  props: {
    userId: {
      type: [String, Number],
    },
  },
  setup(props) {
    const router = useRouter()
    const loading = ref<boolean>(true)
    const account = ref<Account>()
    const contents = ref<Content[]>([])

    onMounted(async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/account/${props.userId}`
        )
        console.log(res.data)
        account.value = res.data
        console.log(account.value)
      } catch (error) {
        console.log(error.response)
        if (error.response.status === 404) {
          router.push({ name: 'ContentList' })
        }
      }
      try {
        const res = await axios.get('http://localhost:3000/contents')
        contents.value = res.data
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })
    return {
      loading,
      account,
      contents,
    }
  },
})
</script>

<style lang="scss" scoped>
.profile-main__info__section {
  @apply py-6 px-4 grid gap-4;

  .profile-main__info__top--array {
    @apply flex justify-between items-center;
  }

  .profile-main__info--array {
    @apply flex justify-between items-center;
  }
}

.profile-main__seen__section,
.profile-main__rating__section {
  @apply py-6 px-4 grid gap-4;

  header {
    @apply flex items-center justify-between;

    h3 {
      @apply text-xl font-bold;
    }
  }

  .contents-list {
    @apply grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2;
  }
}
</style>
