<template>
  <section v-if="loading">로딩 중</section>
  <template v-else>
    <div class="container max-w-screen-md">
      <div class="profile-main__info__section">
        <div class="profile-main__info__top--array">
          <div class="text-2xl font-bold">내 정보</div>
          <div class="text-gray-400">
            <router-link :to="{ name: 'ProfileEdit' }">수정</router-link>
          </div>
        </div>
        <div class="profile-main__info--array">
          <p class="text-gray-500">닉네임</p>
          <p>{{ accounts[0].nickName }}</p>
          <!-- <p>d</p> -->
        </div>
        <div class="profile-main__info--array">
          <p class="text-gray-500">이름</p>
          <p>{{ accounts[0].name }}</p>
        </div>
        <div class="profile-main__info--array">
          <p class="text-gray-500">휴대폰 번호</p>
          <p>{{ accounts[0].phoneNumber }}</p>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

interface Account {
  id: number
  name: string
  nickName: string
  phoneNumber: string
}

export default defineComponent({
  name: 'ProfileMain',
  setup() {
    const loading = ref<boolean>(true)
    const accounts = ref<Account[]>()

    onMounted(async () => {
      try {
        const res = await axios.get(`http://localhost:3000/account`)
        console.log(res.data)
        accounts.value = res.data
        console.log(accounts.value)
      } catch (error) {
        console.log(error)
      }
      loading.value = false
    })
    return {
      loading,
      accounts,
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
</style>
